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

      // Rejette les requêtes avec des propriétés non autorisées
      forbidNonWhitelisted: true,

      // Options de transformation avancées
      transformOptions: {
        enableImplicitConversion: true,
        exposeDefaultValues: true,
      },

      // Factory personnalisée pour les erreurs de validation
      exceptionFactory: (errors) => {
        const details = errors.reduce((acc, error) => {
          const field = error.property;
          const constraints = error.constraints;

          if (constraints) {
            // Prendre le premier message d'erreur disponible
            acc[field] = Object.values(constraints)[0];
          }

          // Gérer les erreurs imbriquées
          if (error.children && error.children.length > 0) {
            const nestedErrors = error.children.reduce((nestedAcc, child) => {
              if (child.constraints) {
                nestedAcc[`${field}.${child.property}`] = Object.values(
                  child.constraints,
                )[0];
              }
              return nestedAcc;
            }, {});
            Object.assign(acc, nestedErrors);
          }

          return acc;
        }, {});

        return ApiError.validationError(
          'Erreur de validation des données',
          details,
        );
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
