"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const express_1 = require("express");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    app.use((0, express_1.json)({ limit: '10mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '10mb' }));
    const corsOrigin = config.get('CORS_ORIGIN', 'http://localhost:3000');
    app.enableCors({
        origin: corsOrigin.includes(',')
            ? corsOrigin.split(',').map((o) => o.trim())
            : corsOrigin,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Promylink API')
        .setDescription('Promylink Backend REST API specification, data models, and interactive testing documentation.')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your Supabase JWT access token',
        in: 'header',
    }, 'JWT-auth')
        .addTag('System', 'System status and health checks')
        .addTag('Profile', 'User profile management & role-gated routes')
        .addTag('Organization Onboarding', 'Multi-step business onboarding & verification application workflow')
        .addTag('Storage', 'Document & asset storage signed URLs and secure access management')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        customSiteTitle: 'Promylink API Docs',
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'list',
            filter: true,
        },
    });
    const port = config.get('PORT', 4000);
    await app.listen(port);
    console.log(`Promylink backend running on port ${port}`);
    console.log(`Swagger documentation available at: http://localhost:${port}/docs`);
}
void bootstrap();
//# sourceMappingURL=main.js.map