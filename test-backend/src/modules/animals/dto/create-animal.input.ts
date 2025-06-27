import {
  InputType,
  Field,
  Int,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';

@InputType()
export class CreateAnimalInput {
  @Field()
  name: string;

  @Field(() => GraphQLISODateTime)
  dateOfBirth: Date;

  @Field()
  species: string;

  @Field()
  breed: string;

  @Field()
  color: string;

  @Field(() => Float)
  weight: number;

  @Field(() => Int)
  ownerId: number;
}
