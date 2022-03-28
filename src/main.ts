import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  // Create a new instance of the NestFastifyApplication
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
  );

  // Set the global prefix to /api
  app.setGlobalPrefix('api');

  // Set the validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Ignore unknown properties
    }),
  );

  // Set the logger
  const logger = new Logger('API');
  app.useLogger(logger);

  // Declare the ConfigService
  const configService = app.get(ConfigService);

  // Retrieve environment variables from the config
  const PORT = configService.get<number>('SERVER_PORT');
  const environment = configService.get<string>('NODE_ENV');
  const title = configService.get<string>('ENVIRONMENT_TITLE');

  // Start the server
  await app.listen(PORT || 9999, '0.0.0.0');

  logger.log(
    `${environment}, REST-API Server is listening on Port - ${PORT} - Environment: ${title}`,
  );
}
bootstrap();
