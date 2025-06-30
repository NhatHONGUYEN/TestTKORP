import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 1 })
  @Min(1, { message: 'La page doit être supérieure à 0' })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  @Min(1, { message: 'La limite doit être supérieure à 0' })
  @Max(100, { message: 'La limite ne peut pas dépasser 100' })
  limit: number;
}
