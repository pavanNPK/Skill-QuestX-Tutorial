import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Serve uploaded files statically
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads' });

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:4200';
  app.enableCors({ origin: clientUrl, credentials: true });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
bootstrap();
