import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as packageMeta from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get<ConfigService>('ConfigService');
  const port = config.get('serverPort');
  const swaggerRoot = config.get('swaggerRoot');

  const options = new DocumentBuilder()
    .setTitle(packageMeta.name)
    .setDescription(packageMeta.description)
    .setVersion(packageMeta.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerRoot, app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const logger = new Logger();
  await app.listen(port);
  logger.log(`Server started on port ${port}`);
}

bootstrap();
