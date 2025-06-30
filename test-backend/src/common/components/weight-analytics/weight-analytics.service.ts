import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from 'src/modules/animals/entities/animal.entity';
import { Owner } from 'src/modules/owners/entities/owner.entity';
import { ApiError } from 'src/common/exceptions';
import {
  OwnerAnimalsWeight,
  OwnerHeaviestAnimal,
} from 'src/common/graphql/statistics.graphql';

@Injectable()
export class WeightAnalyticsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>,
  ) {}

  private handleError(error: Error, message: string): never {
    throw ApiError.databaseError(message, { error: error.message });
  }

  async findOwnerWithHeaviestAnimal(): Promise<OwnerHeaviestAnimal> {
    try {
      const heaviestAnimal = await this.animalsRepository
        .createQueryBuilder('animal')
        .leftJoinAndSelect('animal.owner', 'owner')
        .orderBy('animal.weight', 'DESC')
        .getOne();

      if (!heaviestAnimal) {
        throw ApiError.notFound('No animal found');
      }

      if (!heaviestAnimal.owner) {
        throw ApiError.notFound('Animal without owner found');
      }

      return {
        owner: heaviestAnimal.owner,
        animal: heaviestAnimal,
      };
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        'Error while searching for the owner with the heaviest animal',
      );
    }
  }

  async findOwnerWithHeaviestAnimalsGroup(): Promise<OwnerAnimalsWeight> {
    try {
      const result = await this.ownersRepository
        .createQueryBuilder('owner')
        .leftJoinAndSelect('owner.animals', 'animals')
        .addSelect('SUM(animals.weight)', 'totalWeight')
        .groupBy('owner.id')
        .orderBy('totalWeight', 'DESC')
        .getOne();

      if (!result) {
        throw ApiError.notFound('No owner with animals found');
      }

      const totalWeight =
        result.animals?.reduce(
          (sum, animal) => sum + (animal.weight ?? 0),
          0,
        ) ?? 0;

      return {
        owner: result,
        totalWeight,
      };
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        'Error while searching for the owner with the heaviest group of animals',
      );
    }
  }
}
