import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollsController } from './controllers';
import { PollsService } from './services';
import { PollsRepository } from './repositories';
import { redisModule } from 'src/modules.config';

@Module({
  imports: [ConfigModule, redisModule],
  controllers: [PollsController],
  providers: [PollsService, PollsRepository],
})
export class PollsModule {}
