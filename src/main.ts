import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmptyToUndefinedPipe } from './common/pipes/empty-to-undefined.pipe';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const rawUrls = configService.get<string>('FRONTEND_URL') || '';
  const frontendUrls = rawUrls.split(',').map((url) => url.trim());
  // Enable validation globally
  app.useGlobalPipes(
    new EmptyToUndefinedPipe(),
    new ValidationPipe({
      whitelist: true, // strips properties not in DTO
      forbidNonWhitelisted: true, // throws error if extra props exist
      transform: true, // auto-transform payloads to DTO classes
    }),
  );

  app.enableCors({
    origin: frontendUrls, // your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you use cookies
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
