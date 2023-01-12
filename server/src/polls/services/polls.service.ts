import { Injectable } from '@nestjs/common';
import { CreatePollDto, JoinPollDto, RejoinPollDto } from '../dto';
import { createPollId, createUserId } from '../lib';

@Injectable()
export class PollsService {
  async createPoll(fields: CreatePollDto) {
    const userId = createUserId();
    const pollId = createPollId();

    return {
      ...fields,
      userId,
      pollId,
    };
  }

  async joinPoll(fields: JoinPollDto) {
    return {
      ...fields,
      userId: createUserId(),
    };
  }

  async rejoinPoll(fields: RejoinPollDto) {
    return fields;
  }
}
