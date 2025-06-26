import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { Owner } from '../owners/entities/owner.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { ApiError } from 'src/common/exceptions';

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
        dateOfBirth: input.dateOfBirth.toISOString(),
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

  async findAll(): Promise<Animal[]> {
    try {
      return await this.animalsRepository.find({
        relations: ['owner'],
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
}
