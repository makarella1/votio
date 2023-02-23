import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { SocketIOAdapter } from './polls/lib';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  const configServcie = app.get(ConfigService);
  const port = parseInt(configServcie.get('PORT'));

  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new SocketIOAdapter(app, configServcie));

  app.enableCors({
    origin: [configServcie.get<string>('CLIENT_URL')],
  });

  await app.listen(port);

  logger.log(`SERVER IS SUCCESSFULLY RUNNING ON PORT ${port}`);
}
bootstrap();
