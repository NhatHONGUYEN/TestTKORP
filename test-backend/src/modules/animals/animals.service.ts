import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { Owner } from '../owners/entities/owner.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { ApiError } from 'src/common/exceptions';
import { format } from 'date-fns';
import { PaginationService } from 'src/common/services/pagination.service';
import {
  SpeciesCount,
  SpeciesCountRaw,
} from 'src/common/graphql/statistics.graphql';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>,
  ) {}

  // ===================================
  // CREATE - Création d'un animal
  // ===================================

  async create(input: CreateAnimalInput): Promise<Animal> {
    try {
      const owner = await this.ownersRepository.findOne({
        where: { id: input.ownerId },
      });
      if (!owner) {
        throw ApiError.notFound('Owner', input.ownerId);
      }

      const newAnimal = this.animalsRepository.create({
        ...input,
        dateOfBirth: format(input.dateOfBirth, 'yyyy-MM-dd'),
        owner,
      });
      return await this.animalsRepository.save(newAnimal);
    } catch (error: unknown) {
      throw ApiError.databaseError('Error while creating the animal', {
        error: (error as Error).message,
      });
    }
  }

  // ===================================
  // READ - Lecture des animaux
  // ===================================

  async findAll(page: number = 1, limit: number = 10) {
    try {
      return await PaginationService.paginate(
        this.animalsRepository,
        page,
        limit,
        ['owner'],
        { createdAt: 'DESC' },
      );
    } catch (error: unknown) {
      throw ApiError.databaseError('Error while retrieving animals', {
        error: (error as Error).message,
      });
    }
  }

  async findById(id: number): Promise<Animal> {
    try {
      const existingAnimal = await this.animalsRepository.findOne({
        where: { id },
        relations: ['owner'],
      });
      if (!existingAnimal) {
        throw ApiError.notFound('Animal', id);
      }
      return existingAnimal;
    } catch (error: unknown) {
      throw ApiError.databaseError('Error while retrieving the animal', {
        error: (error as Error).message,
      });
    }
  }

  // ===================================
  // UPDATE - Mise à jour d'un animal
  // ===================================

  async update(id: number, input: UpdateAnimalInput): Promise<Animal> {
    try {
      const animalToUpdate = await this.findById(id);

      if (input.ownerId) {
        const newOwner = await this.ownersRepository.findOne({
          where: { id: input.ownerId },
        });
        if (!newOwner) {
          throw ApiError.notFound('Owner', input.ownerId);
        }
        animalToUpdate.owner = newOwner;
      }

      Object.assign(animalToUpdate, input);
      return await this.animalsRepository.save(animalToUpdate);
    } catch (error: unknown) {
      throw ApiError.databaseError('Error while updating the animal', {
        error: (error as Error).message,
      });
    }
  }

  // ===================================
  // DELETE - Suppression d'un animal
  // ===================================

  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.animalsRepository.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (error: unknown) {
      throw ApiError.databaseError('Error while deleting the animal', {
        error: (error as Error).message,
      });
    }
  }

  // ===================================
  // STATISTIQUES - Méthodes d'analyse
  // ===================================

  async findOldestAnimal(): Promise<Animal> {
    try {
      const oldestAnimal = await this.animalsRepository.findOne({
        relations: ['owner'],
        order: { dateOfBirth: 'ASC' },
      });
      if (!oldestAnimal) {
        throw ApiError.notFound('Animal');
      }
      return oldestAnimal;
    } catch (error: unknown) {
      throw ApiError.databaseError(
        'Error while searching for the oldest animal',
        {
          error: (error as Error).message,
        },
      );
    }
  }

  async findMostCommonSpecies(): Promise<SpeciesCount> {
    try {
      const result = await this.animalsRepository
        .createQueryBuilder('animal')
        .select('animal.species', 'species')
        .addSelect('COUNT(*)', 'count')
        .groupBy('animal.species')
        .orderBy('count', 'DESC')
        .getRawOne<SpeciesCountRaw>();

      if (!result) {
        throw ApiError.notFound('No species found');
      }

      return {
        species: result.species,
        count: parseInt(result.count, 10),
      };
    } catch (error: unknown) {
      throw ApiError.databaseError(
        'Error while searching for the most common species',
        {
          error: (error as Error).message,
        },
      );
    }
  }
}
