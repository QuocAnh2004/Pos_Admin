import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Mọi API đều bắt đầu bằng /api, ví dụ: GET /api/products
  app.setGlobalPrefix('api');

  // Cho phép frontend (Next.js) gọi API từ domain khác
  app.enableCors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:3000' });

  // Tự validate DTO bằng các decorator của class-validator (giống @Valid trong Spring)
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port);
  console.log(`Backend đang chạy: http://localhost:${port}/api/health`);
}
bootstrap();
