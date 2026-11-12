import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // 1. Cấu hình Tiền tố API
  app.setGlobalPrefix('api');

  // 2. Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 3. Cấu hình CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // 4. Cấu hình Tài liệu Swagger / OpenAPI
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ban Chinh Dao Digital Library API')
    .setDescription('Tài liệu API chính thức cho Thư viện số Cao Đài Ban Chỉnh Đạo')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.API_PORT || 4000;
  await app.listen(port);
  logger.log(`Ứng dụng API đang chạy tại: http://localhost:${port}/api`);
  logger.log(`Tài liệu Swagger OpenAPI: http://localhost:${port}/api/docs`);
}

bootstrap();

