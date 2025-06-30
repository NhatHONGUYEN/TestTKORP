import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { ApiError } from '../exceptions';

interface GqlContext {
  req: {
    url?: string;
  };
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext<GqlContext>();

    if (exception instanceof ApiError) {
      throw new GraphQLError(exception.message, {
        extensions: {
          code: exception.code,
          status: exception.getStatus(),
          details: exception.details,
          timestamp: new Date().toISOString(),
          path: ctx.req?.url,
        },
      });
    }

    // Handling other types of errors
    console.error('Unhandled exception:', exception);
    throw new GraphQLError('An internal error occurred', {
      extensions: {
        code: 'INTERNAL_ERROR',
        status: 500,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
