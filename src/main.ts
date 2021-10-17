import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { oauthSchemeConfig } from './misc/config/oauth.config';

function initializeSwaggerModule(app) {
  const config = new DocumentBuilder()
    .setTitle('Geo Platform')
    .addOAuth2(oauthSchemeConfig)
    .setVersion('1.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initializeSwaggerModule(app);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: ['http://localhost:4200'] });
  await app.listen(3000);
}
bootstrap();

