// src/common/services/pagination.service.ts
import { Repository, FindOptionsOrder } from 'typeorm';
import { PaginationMeta } from '../graphql/pagination.graphql';

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
    orderBy: { [key: string]: 'ASC' | 'DESC' } = { id: 'ASC' },
  ): Promise<{ items: T[]; meta: PaginationMeta }> {
    const currentPage = Math.max(1, page);
    const skip = (currentPage - 1) * limit;

    const [items, total] = await repository.findAndCount({
      relations,
      skip,
      take: limit,
      order: orderBy as FindOptionsOrder<T>,
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: currentPage,
      },
    };
  }
}
