import { JwtService } from '@nestjs/jwt';
import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { Payload, SocketWithAuth } from './types';

export class SocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger('SocetIOAdapter');

  constructor(
    private app: INestApplication,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const cors = {
      origin: [this.configService.get<string>('CLIENT_URL')],
    };

    this.logger.log('Configuring SocketIO server with custom options');

    const optionsWithCors: ServerOptions = { ...options, cors };

    const jwtService = this.app.get(JwtService);

    const server = super.createIOServer(port, optionsWithCors) as Server;

    server.of('polls').use(createTokenMiddleware(jwtService));

    return server;
  }
}

const createTokenMiddleware =
  (jwtService: JwtService) => (socket: SocketWithAuth, next) => {
    const token =
      socket.handshake.auth.token || socket.handshake.headers['token']; // The second option is for postman

    try {
      const { sub, pollId, name } = jwtService.verify(token) as Payload;

      socket.userId = sub;
      socket.pollId = pollId;
      socket.name = name;

      next();
    } catch (error) {
      next(new Error(error));
    }
  };
