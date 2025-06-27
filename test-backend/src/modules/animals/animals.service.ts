import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { Owner } from '../owners/entities/owner.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { ApiError } from 'src/common/exceptions';
import {
  SpeciesCount,
  SpeciesCountRaw,
} from 'src/common/types/statistics.types';
import { format } from 'date-fns';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>,
  ) {}

  private handleError(error: Error, message: string): never {
    throw ApiError.databaseError(message, { error: error.message });
  }

  async create(input: CreateAnimalInput): Promise<Animal> {
    try {
      const owner = await this.ownersRepository.findOne({
        where: { id: input.ownerId },
      });
      if (!owner) {
        throw ApiError.notFound(`Owner #${input.ownerId} not found`);
      }

      const newAnimal = this.animalsRepository.create({
        ...input,
        dateOfBirth: format(input.dateOfBirth, 'yyyy-MM-dd'),
        owner,
      });
      return await this.animalsRepository.save(newAnimal);
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        "Erreur lors de la création de l'animal",
      );
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Animal[]> {
    try {
      return await this.animalsRepository.find({
        relations: ['owner'],
        skip: (page - 1) * limit,
        take: limit,
        order: { id: 'ASC' },
      });
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        'Erreur lors de la récupération des animaux',
      );
    }
  }

  async findById(id: number): Promise<Animal> {
    try {
      const existingAnimal = await this.animalsRepository.findOne({
        where: { id },
        relations: ['owner'],
      });
      if (!existingAnimal) {
        throw ApiError.notFound(`Animal #${id} not found`);
      }
      return existingAnimal;
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        "Erreur lors de la récupération de l'animal",
      );
    }
  }

  async update(id: number, input: UpdateAnimalInput): Promise<Animal> {
    try {
      const animalToUpdate = await this.findById(id);

      if (input.ownerId) {
        const newOwner = await this.ownersRepository.findOne({
          where: { id: input.ownerId },
        });
        if (!newOwner) {
          throw ApiError.notFound(`Owner #${input.ownerId} not found`);
        }
        animalToUpdate.owner = newOwner;
      }

      Object.assign(animalToUpdate, input);
      return await this.animalsRepository.save(animalToUpdate);
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        "Erreur lors de la mise à jour de l'animal",
      );
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.animalsRepository.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        "Erreur lors de la suppression de l'animal",
      );
    }
  }

  async findOldestAnimal(): Promise<Animal> {
    try {
      const oldestAnimal = await this.animalsRepository.findOne({
        relations: ['owner'],
        order: { dateOfBirth: 'ASC' },
      });
      if (!oldestAnimal) {
        throw ApiError.notFound('Aucun animal trouvé');
      }
      return oldestAnimal;
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        'Erreur lors de la recherche du plus vieil animal',
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
        throw ApiError.notFound('Aucune espèce trouvée');
      }

      return {
        species: result.species,
        count: parseInt(result.count, 10),
      };
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        "Erreur lors de la recherche de l'espèce la plus commune",
      );
    }
  }
}
