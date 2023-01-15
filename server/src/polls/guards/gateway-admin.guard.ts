import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsUnauthorizedException } from '../exceptions';
import { Payload, SocketWithAuth } from '../lib';
import { PollsService } from '../services';

@Injectable()
export class GatewayAdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly pollsService: PollsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket = context.switchToWs().getClient() as SocketWithAuth;

    const token =
      socket.handshake.auth.token || socket.handshake.headers['token'];

    if (!token) {
      throw new WsUnauthorizedException('Authorization token is required');
    }

    try {
      const { sub, pollId } = this.jwtService.verify(token) as Payload;

      const { adminId } = await this.pollsService.getPoll(pollId);

      if (sub !== adminId) {
        throw new WsUnauthorizedException('Admin priveleges are required!');
      }

      return true;
    } catch (error) {
      console.log(error);
      throw new WsUnauthorizedException('Admin priveleges are required!');
    }
  }
}
