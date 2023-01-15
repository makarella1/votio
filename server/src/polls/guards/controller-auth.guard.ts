import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { Payload, RequestWithAuth } from '../lib';

@Injectable()
export class ControllerAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest() as RequestWithAuth;

    const { accessToken } = request.body;

    try {
      const { sub, name, pollId } = this.jwtService.verify(
        accessToken,
      ) as Payload;

      request.userId = sub;
      request.name = name;
      request.pollId = pollId;

      return true;
    } catch (error) {
      throw new ForbiddenException('Not authorized!');
    }
  }
}
