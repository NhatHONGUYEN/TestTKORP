// src/common/types/pagination.types.ts
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginationMeta {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

@ObjectType()
export class PaginationMeta {
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
