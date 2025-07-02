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

interface OwnerAnimalsWeightRaw {
  ownerId: number;
  totalWeight: string;
}

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
      // Étape 1: Trouver l'ID du propriétaire avec le poids total le plus élevé
      const result = await this.ownersRepository
        .createQueryBuilder('owner')
        .leftJoin('owner.animals', 'animals')
        .select('owner.id', 'ownerId')
        .addSelect('SUM(animals.weight)', 'totalWeight')
        .groupBy('owner.id')
        .orderBy('totalWeight', 'DESC')
        .getRawOne<OwnerAnimalsWeightRaw>();

      if (!result) {
        throw ApiError.notFound('No owner with animals found');
      }

      // Étape 2: Récupérer le propriétaire complet avec ses animaux
      const owner = await this.ownersRepository.findOne({
        where: { id: result.ownerId },
        relations: ['animals'],
      });

      if (!owner) {
        throw ApiError.notFound('Owner not found');
      }

      return {
        owner,
        totalWeight: parseFloat(result.totalWeight),
      };
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        'Error while searching for the owner with the heaviest group of animals',
      );
    }
  }
}
