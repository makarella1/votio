import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollsModule } from './polls/polls.module';
import { redisModule } from './modules.config';

@Module({
  imports: [ConfigModule.forRoot(), PollsModule, redisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
