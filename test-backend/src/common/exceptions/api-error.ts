import { HttpException } from '@nestjs/common';
import { ApiErrorCode, ApiErrorOptions } from './api-error.types';

export type ErrorDetails = Record<
  string,
  string | number | boolean | null | undefined
>;

export class ApiError extends HttpException {
  public readonly code: ApiErrorCode;
  public readonly details?: ErrorDetails;

  constructor(options: ApiErrorOptions) {
    super(options.message, options.status);
    this.code = options.code;
    this.details = options.details;
  }

  static notFound(resource: string, id?: number | string) {
    return new ApiError({
      code: ApiErrorCode.NOT_FOUND,
      status: 404,
      message: `${resource} ${id ? `#${id}` : ''} non trouvé`,
    });
  }

  static conflict(message: string, details?: ErrorDetails) {
    return new ApiError({
      code: ApiErrorCode.CONFLICT,
      status: 409,
      message,
      details,
    });
  }

  static validationError(message: string, details?: ErrorDetails) {
    return new ApiError({
      code: ApiErrorCode.VALIDATION_ERROR,
      status: 400,
      message,
      details,
    });
  }

  static businessError(message: string, details?: ErrorDetails) {
    return new ApiError({
      code: ApiErrorCode.BUSINESS_RULE_VIOLATION,
      status: 422,
      message,
      details,
    });
  }

  static databaseError(message: string, details?: ErrorDetails) {
    return new ApiError({
      code: ApiErrorCode.DATABASE_ERROR,
      status: 500,
      message,
      details,
    });
  }
}
