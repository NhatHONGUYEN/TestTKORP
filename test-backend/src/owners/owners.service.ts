import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { ApiError } from 'src/common/exceptions';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>,
  ) {}

  private handleError(error: Error, message: string): never {
    throw ApiError.databaseError(message, { error: error.message });
  }

  async create(input: CreateOwnerInput): Promise<Owner> {
    try {
      const newOwner = this.ownersRepository.create(input);
      return await this.ownersRepository.save(newOwner);
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        'Erreur lors de la création du propriétaire',
      );
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Owner[]> {
    try {
      return await this.ownersRepository.find({
        relations: ['animals'],
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id: 'ASC',
        },
      });
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        'Erreur lors de la récupération des propriétaires',
      );
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
      this.handleError(
        error as Error,
        'Erreur lors de la récupération du propriétaire',
      );
    }
  }

  async update(id: number, input: UpdateOwnerInput): Promise<Owner> {
    try {
      const ownerToUpdate = await this.findById(id);
      Object.assign(ownerToUpdate, input);
      return await this.ownersRepository.save(ownerToUpdate);
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        'Erreur lors de la mise à jour du propriétaire',
      );
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.ownersRepository.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (error: unknown) {
      this.handleError(
        error as Error,
        'Erreur lors de la suppression du propriétaire',
      );
    }
  }
}
