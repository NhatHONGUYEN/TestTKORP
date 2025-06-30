import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ApiError } from './common/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration du ValidationPipe enterprise-ready
  app.useGlobalPipes(
    new ValidationPipe({
      // Transformation automatique des types
      transform: true,

      // Supprime les propriétés non décorées
      whitelist: true,

      // On garde juste ça pour les erreurs de validation
      exceptionFactory: (errors) => {
        const simpleErrors = {};
        errors.forEach((error) => {
          if (error.constraints) {
            simpleErrors[error.property] = Object.values(error.constraints)[0];
          }
        });
        return ApiError.validationError('Erreur de validation', simpleErrors);
      },

      // Valider même les objets vides
      skipMissingProperties: false,

      // Valider les objets imbriqués
      validationError: {
        target: false,
        value: false,
      },
    }),
  );

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
