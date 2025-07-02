import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { ApiError } from 'src/common/exceptions';
import { PaginationService } from 'src/common/services/pagination.service';
import {
  OwnerAnimalsCount,
  OwnerCatsCount,
} from 'src/common/graphql/statistics.graphql';

interface OwnerAnimalsCountRaw {
  ownerId: number;
  animalCount: string;
}

interface OwnerCatsCountRaw {
  ownerId: number;
  catCount: string;
}

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>,
  ) {}

  // ===================================
  // CREATE - Création d'un propriétaire
  // ===================================

  async create(input: CreateOwnerInput): Promise<Owner> {
    try {
      const newOwner = this.ownersRepository.create(input);
      return await this.ownersRepository.save(newOwner);
    } catch (error: unknown) {
      throw ApiError.databaseError('Error while creating the owner', {
        error: (error as Error).message,
      });
    }
  }

  // ===================================
  // READ - Lecture des propriétaires
  // ===================================

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const pageNum = Number(page);
      const limitNum = Number(limit);

      return await PaginationService.paginate(
        this.ownersRepository,
        pageNum,
        limitNum,
        ['animals'],
        { id: 'ASC' },
      );
    } catch (error) {
      throw ApiError.databaseError('Error while retrieving owners', {
        error: (error as Error).message,
      });
    }
  }

  async findById(id: number): Promise<Owner> {
    try {
      const existingOwner = await this.ownersRepository.findOne({
        where: { id },
        relations: ['animals'],
      });
      if (!existingOwner) {
        throw ApiError.notFound(`Owner #${id} not found`);
      }
      return existingOwner;
    } catch (error: unknown) {
      throw ApiError.databaseError('Error while retrieving the owner', {
        error: (error as Error).message,
      });
    }
  }

  // ===================================
  // UPDATE - Mise à jour d'un propriétaire
  // ===================================

  async update(id: number, input: UpdateOwnerInput): Promise<Owner> {
    try {
      const ownerToUpdate = await this.findById(id);
      Object.assign(ownerToUpdate, input);
      return await this.ownersRepository.save(ownerToUpdate);
    } catch (error: unknown) {
      throw ApiError.databaseError('Error while updating the owner', {
        error: (error as Error).message,
      });
    }
  }

  // ===================================
  // DELETE - Suppression d'un propriétaire
  // ===================================

  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.ownersRepository.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (error: unknown) {
      throw ApiError.databaseError('Error while deleting the owner', {
        error: (error as Error).message,
      });
    }
  }

  // ===================================
  // STATISTIQUES - Méthodes d'analyse
  // ===================================

  async findOwnerWithMostAnimals(): Promise<OwnerAnimalsCount> {
    try {
      // Étape 1: Trouver l'ID du propriétaire avec le plus d'animaux
      const result = await this.ownersRepository
        .createQueryBuilder('owner')
        .leftJoin('owner.animals', 'animals')
        .select('owner.id', 'ownerId')
        .addSelect('COUNT(animals.id)', 'animalCount')
        .groupBy('owner.id')
        .orderBy('animalCount', 'DESC')
        .getRawOne<OwnerAnimalsCountRaw>();

      if (!result) {
        throw ApiError.notFound('No owner found');
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
        animalCount: parseInt(result.animalCount, 10),
      };
    } catch (error: unknown) {
      throw ApiError.databaseError(
        'Error while searching for the owner with most animals',
        { error: (error as Error).message },
      );
    }
  }

  async findOwnerWithMostCats(): Promise<OwnerCatsCount> {
    try {
      // Étape 1: Trouver l'ID du propriétaire avec le plus de chats
      const result = await this.ownersRepository
        .createQueryBuilder('owner')
        .leftJoin('owner.animals', 'animals')
        .where('animals.species = :species', { species: 'Cat' })
        .select('owner.id', 'ownerId')
        .addSelect('COUNT(animals.id)', 'catCount')
        .groupBy('owner.id')
        .orderBy('catCount', 'DESC')
        .getRawOne<OwnerCatsCountRaw>();

      if (!result) {
        throw ApiError.notFound('No cat owner found');
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
        catCount: parseInt(result.catCount, 10),
      };
    } catch (error: unknown) {
      throw ApiError.databaseError(
        'Error while searching for the owner with most cats',
        { error: (error as Error).message },
      );
    }
  }
}
