import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Owner } from '../../owners/entities/owner.entity';
import { Animal } from '../../animals/entities/animal.entity';

export interface SpeciesCountRaw {
  species: string;
  count: string;
}

@ObjectType()
export class SpeciesCount {
  @Field()
  species: string;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class OwnerAnimalsCount {
  @Field(() => Owner)
  owner: Owner;

  @Field(() => Int)
  animalCount: number;
}

@ObjectType()
export class OwnerCatsCount {
  @Field(() => Owner)
  owner: Owner;

  @Field(() => Int)
  catCount: number;
}

@ObjectType()
export class OwnerHeaviestAnimal {
  @Field(() => Owner)
  owner: Owner;

  @Field(() => Animal)
  animal: Animal;
}

@ObjectType()
export class OwnerAnimalsWeight {
  @Field(() => Owner)
  owner: Owner;

  @Field(() => Float)
  totalWeight: number;
}
