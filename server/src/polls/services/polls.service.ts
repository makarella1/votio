import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreatePollDto, JoinPollDto, RejoinPollDto } from '../dto';
import { createPollId, createUserId } from '../lib';
import { PollsRepository } from '../repositories';

@Injectable()
export class PollsService {
  constructor(
    private readonly pollsRepository: PollsRepository,
    private readonly jwtModule: JwtService,
  ) {}

  async createPoll(fields: CreatePollDto) {
    const userId = createUserId();
    const pollId = createPollId();

    const createdPoll = await this.pollsRepository.createPoll({
      ...fields,
      userId,
      pollId,
    });

    const accessToken = this.jwtModule.sign(
      {
        name: fields.name,
        pollId: createdPoll.id,
      },
      {
        subject: userId,
      },
    );

    return {
      poll: createdPoll,
      accessToken,
    };
  }

  async joinPoll(fields: JoinPollDto) {
    const userId = createUserId();

    const joinedPoll = await this.pollsRepository.addVoter({
      ...fields,
      userId,
    });

    const accessToken = this.jwtModule.sign(
      {
        name: fields.name,
        pollId: joinedPoll.id,
      },
      {
        subject: userId,
      },
    );

    return {
      pool: joinedPoll,
      accessToken,
    };
  }

  async rejoinPoll(fields: RejoinPollDto) {
    const rejoinedPoll = await this.pollsRepository.addVoter(fields);

    return rejoinedPoll;
  }
}
