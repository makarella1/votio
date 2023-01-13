import { Injectable } from '@nestjs/common';
import { CreatePollDto, JoinPollDto, RejoinPollDto } from '../dto';
import { createPollId, createUserId } from '../lib';
import { PollsRepository } from '../repositories';

@Injectable()
export class PollsService {
  constructor(private readonly pollsRepository: PollsRepository) {}

  async createPoll(fields: CreatePollDto) {
    const userId = createUserId();
    const pollId = createPollId();

    const createdPoll = await this.pollsRepository.createPoll({
      ...fields,
      userId,
      pollId,
    });

    return {
      poll: createdPoll,
    };
  }

  async joinPoll(fields: JoinPollDto) {
    const userId = createUserId();

    const joinedPoll = await this.pollsRepository.addVoter({
      ...fields,
      userId,
    });

    return {
      pool: joinedPoll,
    };
  }

  async rejoinPoll(fields: RejoinPollDto) {
    const rejoinedPoll = await this.pollsRepository.addVoter(fields);

    return rejoinedPoll;
  }
}
