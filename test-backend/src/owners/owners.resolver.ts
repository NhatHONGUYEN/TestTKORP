import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { PaginationArgs } from 'src/animals/dto/pagination.args';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation(() => Owner)
  async createOwner(@Args('input') input: CreateOwnerInput): Promise<Owner> {
    return await this.ownersService.create(input);
  }

  @Query(() => [Owner])
  async owners(@Args() { page, limit }: PaginationArgs): Promise<Owner[]> {
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
}
