import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { AnimalsService } from './animals.service';
import { Animal } from './entities/animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { Paginated } from 'src/common/graphql/pagination.graphql';

@ObjectType()
class PaginatedAnimal extends Paginated(Animal) {}

@Resolver(() => Animal)
export class AnimalsResolver {
  constructor(private readonly animalsService: AnimalsService) {}

  @Mutation(() => Animal)
  async createAnimal(@Args('input') input: CreateAnimalInput): Promise<Animal> {
    return await this.animalsService.create(input);
  }

  @Query(() => PaginatedAnimal)
  async animals(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    console.log('🎯 Animals Resolver received:', { page, limit });
    const result = await this.animalsService.findAll(page, limit);
    console.log('📦 Animals Resolver sending:', {
      page: result.meta.currentPage,
      totalPages: result.meta.totalPages,
      firstItemId: result.items[0]?.id,
      lastItemId: result.items[result.items.length - 1]?.id,
    });
    return result;
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
