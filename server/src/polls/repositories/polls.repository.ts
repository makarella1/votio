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
import {
  AddNominationData,
  AddRankingsData,
  AuthPayload,
  CreatePollData,
} from '../lib';

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
      nominations: {},
      rankings: {},
      adminId: userId,
      hasStarted: false,
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

      return this.getPoll(pollId);
    } catch (error) {
      this.logger.debug(
        `Failed to add a participant with userId/name of ${userId}/${name} to a poll ${pollId}\n${error}`,
      );

      throw new InternalServerErrorException();
    }
  }

  async removeVoter(pollId: string, userId: string): Promise<Poll> {
    const key = `polls:${pollId}`;
    const path = `.voters.${userId}`;

    try {
      await this.redisClient.sendCommand(
        new Redis.Command('JSON.DEL', [key, path]),
      );

      return this.getPoll(pollId);
    } catch (error) {
      this.logger.error(`Failed to remove user with ID: ${userId}.\n${error}`);

      throw new InternalServerErrorException();
    }
  }

  async addNomination({
    pollId,
    nominationId,
    nomination,
  }: AddNominationData): Promise<Poll> {
    try {
      const key = `polls:${pollId}`;
      const path = `.nominations.${nominationId}`;

      await this.redisClient.sendCommand(
        new Redis.Command('JSON.SET', [key, path, JSON.stringify(nomination)]),
      );

      return this.getPoll(pollId);
    } catch (error) {
      this.logger.error(`Failed to add a nomination with ID: ${nominationId}`);

      throw new InternalServerErrorException('Failed to add a nomination!');
    }
  }

  async removeNomination(pollId: string, nominationId: string): Promise<Poll> {
    try {
      const key = `polls:${pollId}`;
      const path = `.nominations.${nominationId}`;

      await this.redisClient.sendCommand(
        new Redis.Command('JSON.DEL', [key, path]),
      );

      return this.getPoll(pollId);
    } catch (error) {
      this.logger.error(
        `Failed to remove a nomination with ID: ${nominationId}`,
      );

      throw new InternalServerErrorException('Failed to remove a nomination!');
    }
  }

  async startPoll(pollId: string): Promise<Poll> {
    this.logger.debug(
      `Setting the "hasStarted" property for poll with id: "${pollId}"`,
    );

    const key = `polls:${pollId}`;

    try {
      await this.redisClient.sendCommand(
        new Redis.Command('JSON.SET', [
          key,
          '.hasStarted',
          JSON.stringify(true),
        ]),
      );

      return this.getPoll(pollId);
    } catch (error) {
      this.logger.error(
        `Failed to set the "hasStarted" property for poll with id: "${pollId}"`,
      );

      throw new InternalServerErrorException(
        'Something went wrong when starting the poll!',
      );
    }
  }

  async addRankings({
    userId,
    pollId,
    rankings,
  }: AddRankingsData): Promise<Poll> {
    try {
      this.logger.log(
        `Attempting to add the rankings for user with id: "${userId}" and poll with id: "${pollId}"`,
        rankings,
      );

      const key = `polls:${pollId}`;
      const path = `.rankings.${userId}`;

      await this.redisClient.sendCommand(
        new Redis.Command('JSON.SET', [key, path, JSON.stringify(rankings)]),
      );

      return this.getPoll(pollId);
    } catch (error) {
      this.logger.error(
        `Failed to add the rankings for user with id: "${userId}" and poll with id: "${pollId}"`,
        rankings,
      );

      throw new InternalServerErrorException(
        'Something went wrong when adding rankings',
      );
    }
  }
}
