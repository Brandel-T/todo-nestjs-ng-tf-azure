import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ToDo API')
    .setDescription('My fullstack todo API')
    .setVersion('1.0')
    .addTag('Todos', 'Endpoint for CRUD operations on ToDo ressource')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      'https://nice-wave-049b5d303.1.azurestaticapps.net',
      'http://localhost:4200',
    ],
    methods: 'GET, PUT, POST, DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  });
  app.setGlobalPrefix('api');

  await app.listen(port ?? 3000);
}
bootstrap();
