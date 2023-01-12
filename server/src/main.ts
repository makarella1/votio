import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:8080'],
    },
  });

  const configServcie = app.get(ConfigService);
  const port = parseInt(configServcie.get('PORT'));

  await app.listen(port);

  logger.log(`SERVER IS SUCCESSFULLY RUNNING ON PORT ${port}`);
}
bootstrap();
