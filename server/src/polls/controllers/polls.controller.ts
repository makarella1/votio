import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';

import { CreatePollDto, JoinPollDto } from '../dto';
import { PollsService } from '../services';
import { ControllerAuthGuard } from '../guards';
import { RequestWithAuth } from '../lib';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  async createPoll(@Body() createPollDto: CreatePollDto) {
    const result = await this.pollsService.createPoll(createPollDto);

    return result;
  }

  @Post('/join')
  async joinPoll(@Body() joinPollDto: JoinPollDto) {
    const result = await this.pollsService.joinPoll(joinPollDto);

    return result;
  }

  @Post('/rejoin')
  @UseGuards(ControllerAuthGuard)
  async rejoinPoll(@Req() request: RequestWithAuth) {
    const { name, userId, pollId } = request;

    const result = await this.pollsService.rejoinPoll({ name, userId, pollId });

    return result;
  }
}
