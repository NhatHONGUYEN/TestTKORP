// src/common/services/pagination.service.ts
import { Repository, FindOptionsOrder } from 'typeorm';
import { PaginationMeta } from '../types/pagination.types';

interface HasId {
  id: number;
  createdAt?: Date;
}

export class PaginationService {
  static async paginate<T extends HasId>(
    repository: Repository<T>,
    page: number = 1,
    limit: number = 10,
    relations: string[] = [],
    orderBy: { [key: string]: 'ASC' | 'DESC' } = { id: 'DESC' },
  ): Promise<{ items: T[]; meta: PaginationMeta }> {
    const [items, total] = await repository.findAndCount({
      relations,
      skip: (page - 1) * limit,
      take: limit,
      order: orderBy as FindOptionsOrder<T>,
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }
}
