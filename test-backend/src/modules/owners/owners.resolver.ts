import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import {
  OwnerAnimalsCount,
  OwnerCatsCount,
} from 'src/common/types/statistics.types';
import { Paginated } from 'src/common/types/pagination.types';

@ObjectType()
class PaginatedOwner extends Paginated(Owner) {}

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation(() => Owner)
  async createOwner(@Args('input') input: CreateOwnerInput): Promise<Owner> {
    return await this.ownersService.create(input);
  }

  @Query(() => PaginatedOwner)
  async owners(@Args() { page, limit }: PaginationArgs) {
    return await this.ownersService.findAll(page, limit);
  }

  @Query(() => Owner)
  async findOwnerById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Owner> {
    return await this.ownersService.findById(id);
  }

  @Mutation(() => Owner)
  async updateOwner(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateOwnerInput,
  ): Promise<Owner> {
    return await this.ownersService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeOwner(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return await this.ownersService.remove(id);
  }

  @Query(() => OwnerAnimalsCount)
  async ownerWithMostAnimals(): Promise<OwnerAnimalsCount> {
    return await this.ownersService.findOwnerWithMostAnimals();
  }

  @Query(() => OwnerCatsCount)
  async ownerWithMostCats(): Promise<OwnerCatsCount> {
    return await this.ownersService.findOwnerWithMostCats();
  }
}
