import { InputType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { IsNotEmpty, IsDate, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateAnimalInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => GraphQLISODateTime)
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @Field()
  @IsNotEmpty()
  species: string;

  @Field()
  @IsNotEmpty()
  breed: string;

  @Field()
  @IsNotEmpty()
  color: string;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  weight: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  ownerId: number;
}
