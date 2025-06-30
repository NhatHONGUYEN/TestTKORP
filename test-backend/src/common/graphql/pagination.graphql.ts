// src/common/graphql/pagination.graphql.ts
import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IPaginationMeta } from '../types/pagination.types';

@ObjectType()
export class PaginationMeta implements IPaginationMeta {
  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  itemsPerPage: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;
}

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    items: T[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
  }
  return PaginatedType;
}
