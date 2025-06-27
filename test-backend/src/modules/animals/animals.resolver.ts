import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnimalsService } from './animals.service';
import { Animal } from './entities/animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { PaginationArgs } from 'src/common/dto/pagination.args';

@Resolver(() => Animal)
export class AnimalsResolver {
  constructor(private readonly animalsService: AnimalsService) {}

  @Mutation(() => Animal)
  async createAnimal(@Args('input') input: CreateAnimalInput): Promise<Animal> {
    return await this.animalsService.create(input);
  }

  @Query(() => [Animal])
  async animals(@Args() { page, limit }: PaginationArgs): Promise<Animal[]> {
    return await this.animalsService.findAll(page, limit);
  }

  @Query(() => Animal)
  async findAnimalById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Animal> {
    return await this.animalsService.findById(id);
  }

  @Mutation(() => Animal)
  async updateAnimal(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateAnimalInput,
  ): Promise<Animal> {
    return await this.animalsService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeAnimal(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return await this.animalsService.remove(id);
  }
}
