import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const corsOrigin = config.get<string>('CORS_ORIGIN', 'http://localhost:3000');
  app.enableCors({
    origin: corsOrigin.includes(',')
      ? corsOrigin.split(',').map((o) => o.trim())
      : corsOrigin,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger / OpenAPI documentation setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Promylink API')
    .setDescription(
      'Promylink Backend REST API specification, data models, and interactive testing documentation.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your Supabase JWT access token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('System', 'System status and health checks')
    .addTag('Profile', 'User profile management & role-gated routes')
    .addTag(
      'Organization Onboarding',
      'Multi-step business onboarding & verification application workflow',
    )
    .addTag(
      'Storage',
      'Document & asset storage signed URLs and secure access management',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Promylink API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
    },
  });

  const port = config.get<number>('PORT', 4000);
  await app.listen(port);
  console.log(`Promylink backend running on port ${port}`);
  console.log(
    `Swagger documentation available at: http://localhost:${port}/docs`,
  );
}
void bootstrap();
