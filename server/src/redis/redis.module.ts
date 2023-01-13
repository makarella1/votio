import { Module, DynamicModule } from '@nestjs/common';
import { FactoryProvider, ModuleMetadata } from '@nestjs/common/interfaces';
import IORedis, { Redis, RedisOptions } from 'ioredis';

export const IO_REDIS_KEY = 'IORedis';

// Well, that's tricky...

interface RedisModuleOptions {
  connectionOptions: RedisOptions;
  onClientReady?: (client: Redis) => void;
}

type RedisAsyncModuleOptions = {
  useFactory: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;

@Module({})
export class RedisModule {
  static async registerAsync({
    useFactory,
    imports,
    inject,
  }: RedisAsyncModuleOptions): Promise<DynamicModule> {
    const redisProvider = {
      provide: IO_REDIS_KEY,
      useFactory: async (...args: any[]) => {
        const { onClientReady, connectionOptions } = await useFactory(...args);

        const client = new IORedis(connectionOptions);

        onClientReady(client);

        return client;
      },
      inject,
    };

    return {
      module: RedisModule,
      imports,
      exports: [redisProvider],
      providers: [redisProvider],
    };
  }
}
