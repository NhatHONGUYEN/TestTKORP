import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Appliquer le filtre d'exception global
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableCors({
    origin: 'http://localhost:3000', // L'URL de votre frontend Next.js
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });
  await app.listen(4000); // Utiliser le port 4000
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
