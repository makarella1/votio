import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { SocketWithAuth } from '../lib';
import { PollsService } from '../services';

@WebSocketGateway({ namespace: 'polls' })
export class PollsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger('PollsGateway');

  constructor(private readonly pollsService: PollsService) {}

  @WebSocketServer() io: Namespace;

  handleConnection(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.log(
      `WS Client with an ID ${client.userId}, pollId ${client.pollId} and name ${client.name} has just connected!`,
    );
    this.logger.debug(`Total amount of connected sockets: ${sockets.size}`);

    this.io.emit('hello', `hello from ${client.id}`);
  }

  handleDisconnect(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.log(
      `WS Client with an ID ${client.userId}, pollId ${client.pollId} and name ${client.name} has just connected!`,
    );
    this.logger.debug(`Total amount of connected sockets: ${sockets.size}`);
  }

  afterInit() {
    this.logger.log('Websocket Gateway is initialized');
  }
}
