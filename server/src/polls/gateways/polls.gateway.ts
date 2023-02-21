import { ValidationPipe } from '@nestjs/common/pipes';
import { Logger, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { SocketWithAuth } from '../lib';
import { PollsService } from '../services';
import { WsCatchAllFilter } from '../exceptions';
import { GatewayAdminGuard } from '../guards';
import { AddNominationDto, AddRankingsDto } from '../dto';

@UseFilters(new WsCatchAllFilter())
@UsePipes(new ValidationPipe())
@WebSocketGateway({ namespace: 'polls' })
export class PollsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger('PollsGateway');

  constructor(private readonly pollsService: PollsService) {}

  @WebSocketServer() io: Namespace;

  afterInit() {
    this.logger.log('Websocket Gateway is initialized');
  }

  async handleConnection(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.log(
      `WS Client with an ID ${client.userId}, pollId ${client.pollId} and name ${client.name} has just connected!`,
    );
    this.logger.debug(`Total amount of connected sockets: ${sockets.size}`);

    const roomName = client.pollId;
    await client.join(roomName);

    const connectedClientsCount =
      this.io.adapter.rooms?.get(roomName)?.size ?? 0;

    this.logger.debug(`User "${client.userId}" joined the room "${roomName}"`);
    this.logger.debug(
      `Total clients that are connected to this room: ${connectedClientsCount}`,
    );

    const updatedPoll = await this.pollsService.addVoter({
      name: client.name,
      pollId: client.pollId,
      userId: client.userId,
    });

    this.io.to(roomName).emit('poll_updated', updatedPoll);
  }

  async handleDisconnect(client: SocketWithAuth) {
    const { userId, pollId } = client;

    const updatedPoll = await this.pollsService.removeVoter(pollId, userId);

    const connectedClientsCount = this.io.adapter.rooms?.get(pollId)?.size ?? 0;

    if (connectedClientsCount === 0) {
      await this.pollsService.deletePoll(pollId);
    }

    this.logger.log(`Socket disconnected: ${client.id}`);
    this.logger.log(
      `Total clients that are connected to this room: ${connectedClientsCount}`,
    );

    if (updatedPoll) {
      this.io.to(pollId).emit('poll_updated', updatedPoll);
    }
  }

  @UseGuards(GatewayAdminGuard)
  @SubscribeMessage('remove_voter')
  async removeVoter(
    @MessageBody('id') id: string,
    @ConnectedSocket() client: SocketWithAuth,
  ) {
    this.logger.debug(
      `Attempting to remove voter "${id}" from poll "${client.pollId}"`,
    );

    const updatedPoll = await this.pollsService.removeVoter(client.pollId, id);

    if (updatedPoll) {
      this.io.to(client.pollId).emit('poll_updated', updatedPoll);
    }
  }

  @SubscribeMessage('nominate')
  async nominate(
    @MessageBody() { text }: AddNominationDto,
    @ConnectedSocket() { pollId, userId }: SocketWithAuth,
  ) {
    this.logger.debug(
      `Attempting to add a nomination for user: "${userId}", poll: "${pollId}", nomination: "${text}"`,
    );

    const updatedPoll = await this.pollsService.addNomination({
      text,
      pollId,
      userId,
    });

    this.io.to(pollId).emit('poll_updated', updatedPoll);
  }

  @UseGuards(GatewayAdminGuard)
  @SubscribeMessage('remove_nomination')
  async removeNomination(
    @MessageBody('nominationId') nominationId: string,
    @ConnectedSocket() { pollId }: SocketWithAuth,
  ) {
    this.logger.debug(
      `Attempting to remove a nomination with id: "${nominationId}"`,
    );

    const updatedPoll = await this.pollsService.removeNomination(
      pollId,
      nominationId,
    );

    this.io.to(pollId).emit('poll_updated', updatedPoll);
  }

  @UseGuards(GatewayAdminGuard)
  @SubscribeMessage('start_poll')
  async startPoll(@ConnectedSocket() { pollId }: SocketWithAuth) {
    this.logger.debug(`Attempting to start the poll with id: "${pollId}"`);

    const updatedPoll = await this.pollsService.startPoll(pollId);

    this.io.to(pollId).emit('poll_updated', updatedPoll);
  }

  @SubscribeMessage('add_rankings')
  async addRankings(
    @MessageBody() { rankings }: AddRankingsDto,
    @ConnectedSocket() { pollId, userId }: SocketWithAuth,
  ) {
    this.logger.debug(
      `Attempting to add rankings to the poll with id: "${pollId}"`,
    );

    const updatedPoll = await this.pollsService.addRankings({
      pollId,
      userId,
      rankings,
    });

    this.io.to(pollId).emit('poll_updated', updatedPoll);
  }

  @UseGuards(GatewayAdminGuard)
  @SubscribeMessage('delete_poll')
  async deletePoll(@ConnectedSocket() { pollId }: SocketWithAuth) {
    this.logger.log(`Attempting to delete the poll with id: ${pollId}`);

    await this.pollsService.deletePoll(pollId);

    this.io.in(pollId).disconnectSockets();
  }

  @UseGuards(GatewayAdminGuard)
  @SubscribeMessage('close_poll')
  async computeResults(@ConnectedSocket() { pollId }: SocketWithAuth) {
    this.logger.log(
      `Attempting to compute the results for the poll with id: ${pollId}`,
    );

    const updatedPoll = await this.pollsService.computeResults(pollId);

    this.io.in(pollId).emit('poll_updated', updatedPoll);
  }
}
