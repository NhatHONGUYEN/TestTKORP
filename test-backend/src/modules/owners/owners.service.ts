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

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>,
  ) {}

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

  async findOwnerWithMostAnimals(): Promise<OwnerAnimalsCount> {
    try {
      const result = await this.ownersRepository
        .createQueryBuilder('owner')
        .leftJoinAndSelect('owner.animals', 'animals')
        .addSelect('COUNT(animals.id)', 'animalCount')
        .groupBy('owner.id')
        .orderBy('animalCount', 'DESC')
        .getOne();

      if (!result) {
        throw ApiError.notFound('No owner found');
      }

      return {
        owner: result,
        animalCount: result.animals?.length ?? 0,
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
      const result = await this.ownersRepository
        .createQueryBuilder('owner')
        .leftJoinAndSelect('owner.animals', 'animals')
        .where('animals.species = :species', { species: 'Chat' })
        .addSelect('COUNT(animals.id)', 'catCount')
        .groupBy('owner.id')
        .orderBy('catCount', 'DESC')
        .getOne();

      if (!result) {
        throw ApiError.notFound('No cat owner found');
      }

      return {
        owner: result,
        catCount: result.animals?.length ?? 0,
      };
    } catch (error: unknown) {
      throw ApiError.databaseError(
        'Error while searching for the owner with most cats',
        { error: (error as Error).message },
      );
    }
  }
}
