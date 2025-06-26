import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { Owner } from '../owners/entities/owner.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>,
  ) {}

  async create(input: CreateAnimalInput): Promise<Animal> {
    const owner = await this.ownersRepository.findOne({
      where: { id: input.ownerId },
    });
    if (!owner) {
      throw new Error(`Owner #${input.ownerId} not found`);
    }

    const newAnimal = this.animalsRepository.create({
      ...input,
      dateOfBirth: input.dateOfBirth.toISOString(),
      owner,
    });
    return await this.animalsRepository.save(newAnimal);
  }

  async findAll(): Promise<Animal[]> {
    return await this.animalsRepository.find({
      relations: ['owner'],
    });
  }

  async findById(id: number): Promise<Animal> {
    const existingAnimal = await this.animalsRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!existingAnimal) {
      throw new Error(`Animal #${id} not found`);
    }
    return existingAnimal;
  }

  async update(id: number, input: UpdateAnimalInput): Promise<Animal> {
    const animalToUpdate = await this.findById(id);

    if (input.ownerId) {
      const newOwner = await this.ownersRepository.findOne({
        where: { id: input.ownerId },
      });
      if (!newOwner) {
        throw new Error(`Owner #${input.ownerId} not found`);
      }
      animalToUpdate.owner = newOwner;
    }

    Object.assign(animalToUpdate, input);
    return await this.animalsRepository.save(animalToUpdate);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.animalsRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
