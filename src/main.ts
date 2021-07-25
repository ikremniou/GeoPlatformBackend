import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

function initializeSwaggerModule(app) {
  const config = new DocumentBuilder()
    .setTitle('Geo Platform')
    .addOAuth2({
      type: 'oauth2',
      scheme: 'bearer',
      bearerFormat: 'jwt',
      flows: {
        password: {
          scopes: {},
          tokenUrl: '../api/auth/local',
        }
      }
    })
    .setVersion('1.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initializeSwaggerModule(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

