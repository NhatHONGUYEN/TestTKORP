import { ErrorDetails } from './api-error';

export enum ApiErrorCode {
  // Erreurs d'authentification/autorisation
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',

  // Erreurs de données
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  VALIDATION_ERROR = 'VALIDATION_ERROR',

  // Erreurs métier
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',

  // Erreurs techniques
  DATABASE_ERROR = 'DATABASE_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export interface ApiErrorOptions {
  code: ApiErrorCode;
  status: number;
  message: string;
  details?: ErrorDetails;
}
