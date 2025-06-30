import { ErrorDetails } from './api-error';

export enum ApiErrorCode {
  // Authentication/Authorization errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',

  // Data errors
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  VALIDATION_ERROR = 'VALIDATION_ERROR',

  // Business errors
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',

  // Technical errors
  DATABASE_ERROR = 'DATABASE_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export interface ApiErrorOptions {
  code: ApiErrorCode;
  status: number;
  message: string;
  details?: ErrorDetails;
}
