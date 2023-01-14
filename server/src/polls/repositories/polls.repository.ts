import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { IO_REDIS_KEY } from '../../redis/redis.module';
import { Poll } from 'shared';
import { AuthPayload, CreatePollData } from '../lib';

@Injectable()
export class PollsRepository {
  private readonly timeToLive: string;
  private readonly logger = new Logger('PollsRepository');

  constructor(
    private readonly configService: ConfigService,
    @Inject(IO_REDIS_KEY) private readonly redisClient: Redis,
  ) {
    this.timeToLive = configService.get('POLL_DURATION');
  }

  async createPoll({
    votesPerVoter,
    topic,
    userId,
    pollId,
  }: CreatePollData): Promise<Poll> {
    const initialPoll: Poll = {
      id: pollId,
      topic,
      votesPerVoter,
      voters: {},
      adminId: userId,
    };

    this.logger.log(
      `Creating a new poll: ${JSON.stringify(
        initialPoll,
        null,
        2,
      )} with time-to-live of ${this.timeToLive}s`,
    );

    const key = `polls:${pollId}`;

    try {
      await this.redisClient.sendCommand(
        new Redis.Command('JSON.SET', [key, '.', JSON.stringify(initialPoll)]),
      );
      await this.redisClient.expire(key, this.timeToLive);

      return initialPoll;
    } catch (error) {
      this.logger.error(
        `Failed to add poll ${JSON.stringify(initialPoll)}\n${error}`,
      );

      throw new InternalServerErrorException();
    }
  }

  async getPoll(pollId: string): Promise<Poll> {
    this.logger.log(`Attempting to get the poll with an ID of: ${pollId}`);

    const key = `polls:${pollId}`;

    try {
      const currentPoll = (await this.redisClient.sendCommand(
        new Redis.Command('JSON.GET', [key, '.']),
      )) as string;

      this.logger.verbose(currentPoll);

      return JSON.parse(currentPoll) as Poll;
    } catch (error) {
      this.logger.error(
        `Failed to get a poll with an ID of: ${pollId}\n${error}`,
      );

      throw new InternalServerErrorException();
    }
  }

  async addVoter({ pollId, userId, name }: AuthPayload): Promise<Poll> {
    this.logger.log(
      `Attempting to add a participant with userId/name of ${userId}/${name} to a poll ${pollId}`,
    );

    const key = `polls:${pollId}`;
    const voterPath = `.voters.${userId}`;

    try {
      await this.redisClient.sendCommand(
        new Redis.Command('JSON.SET', [key, voterPath, JSON.stringify(name)]),
      );

      const pollJSON = (await this.redisClient.sendCommand(
        new Redis.Command('JSON.GET', [key, '.']),
      )) as string;

      const poll = JSON.parse(pollJSON) as Poll;

      this.logger.debug(`Voters for poll ${pollId}: `, poll.voters);

      return poll;
    } catch (error) {
      this.logger.debug(
        `Failed to add a participant with userId/name of ${userId}/${name} to a poll ${pollId}\n${error}`,
      );

      throw new InternalServerErrorException();
    }
  }
}
