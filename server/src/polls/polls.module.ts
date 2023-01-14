import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollsController } from './controllers';
import { PollsService } from './services';
import { PollsRepository } from './repositories';
import { redisModule, jwtModule } from 'src/modules.config';
import { PollsGateway } from './gateways';

@Module({
  imports: [ConfigModule, redisModule, jwtModule],
  controllers: [PollsController],
  providers: [PollsService, PollsRepository, PollsGateway],
})
export class PollsModule {}
