import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));

  const PORT = app.get(ConfigService).get('PORT');
  await app.listen(PORT);
}
bootstrap();
