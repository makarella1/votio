import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollsController } from './controllers';
import { PollsService } from './services';

@Module({
  imports: [ConfigModule],
  controllers: [PollsController],
  providers: [PollsService],
})
export class PollsModule {}
