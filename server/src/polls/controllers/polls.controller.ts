import { Controller, Post, Body } from '@nestjs/common';
import { CreatePollDto, JoinPollDto, RejoinPollDto } from '../dto';
import { PollsService } from '../services';

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
  async rejoinPoll(@Body() rejoinPollDto: RejoinPollDto) {
    const result = await this.pollsService.rejoinPoll(rejoinPollDto);

    return result;
  }
}
