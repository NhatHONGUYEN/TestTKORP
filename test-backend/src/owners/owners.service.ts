import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>,
  ) {}

  async create(input: CreateOwnerInput): Promise<Owner> {
    const owner = this.ownersRepository.create(input);
    return await this.ownersRepository.save(owner);
  }

  async findAll(): Promise<Owner[]> {
    return await this.ownersRepository.find({
      relations: ['animals'],
    });
  }

  async findById(id: number): Promise<Owner> {
    const existingOwner = await this.ownersRepository.findOne({
      where: { id },
      relations: ['animals'],
    });
    if (!existingOwner) {
      throw new Error(`Owner #${id} not found`);
    }
    return existingOwner;
  }

  async update(id: number, input: UpdateOwnerInput): Promise<Owner> {
    const ownerToUpdate = await this.findById(id);
    Object.assign(ownerToUpdate, input);
    return await this.ownersRepository.save(ownerToUpdate);
  }

  async remove(id: number): Promise<Owner> {
    const ownerToRemove = await this.findById(id);
    return await this.ownersRepository.remove(ownerToRemove);
  }
}
