import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { SocketWithAuth } from '../lib';
import { WsBadRequestException, WsUnknownException } from './ws-exceptions';

@Catch()
export class WsCatchAllFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const socket = host.switchToWs().getClient() as SocketWithAuth;

    if (exception instanceof BadRequestException) {
      const exceptionData = exception.getResponse();

      const exceptionMessage =
        exceptionData['message'] ?? exceptionData ?? exception.name;

      const wsException = new WsBadRequestException(exceptionMessage);

      return socket.emit('exception', wsException.getError());
    }

    const wsException = new WsUnknownException(exception.message);

    return socket.emit('exception', wsException.getError());
  }
}
