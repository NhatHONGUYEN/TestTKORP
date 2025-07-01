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
import { Paginated } from 'src/common/graphql/pagination.graphql';
import {
  OwnerAnimalsCount,
  OwnerCatsCount,
} from 'src/common/graphql/statistics.graphql';

@ObjectType()
class PaginatedOwner extends Paginated(Owner) {}

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  // ===================================
  // CREATE - Création d'un propriétaire
  // ===================================

  @Mutation(() => Owner)
  async createOwner(@Args('input') input: CreateOwnerInput): Promise<Owner> {
    return await this.ownersService.create(input);
  }

  // ===================================
  // READ - Lecture des propriétaires
  // ===================================

  @Query(() => PaginatedOwner)
  async owners(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    return await this.ownersService.findAll(page, limit);
  }

  @Query(() => Owner)
  async findOwnerById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Owner> {
    return await this.ownersService.findById(id);
  }

  // ===================================
  // UPDATE - Mise à jour d'un propriétaire
  // ===================================

  @Mutation(() => Owner)
  async updateOwner(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateOwnerInput,
  ): Promise<Owner> {
    return await this.ownersService.update(id, input);
  }

  // ===================================
  // DELETE - Suppression d'un propriétaire
  // ===================================

  @Mutation(() => Boolean)
  async removeOwner(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return await this.ownersService.remove(id);
  }

  // ===================================
  // STATISTIQUES - Queries d'analyse
  // ===================================

  @Query(() => OwnerAnimalsCount)
  async ownerWithMostAnimals(): Promise<OwnerAnimalsCount> {
    return await this.ownersService.findOwnerWithMostAnimals();
  }

  @Query(() => OwnerCatsCount)
  async ownerWithMostCats(): Promise<OwnerCatsCount> {
    return await this.ownersService.findOwnerWithMostCats();
  }
}
