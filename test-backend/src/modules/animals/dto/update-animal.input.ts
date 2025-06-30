import {
  InputType,
  Field,
  Int,
  PartialType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { CreateAnimalInput } from './create-animal.input';
import { IsOptional, IsInt, IsPositive } from 'class-validator';

@InputType()
export class UpdateAnimalInput extends PartialType(CreateAnimalInput) {
  // ==================== ID ====================
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id: number;

  // ==================== NAME (OPTIONAL) ====================
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  // ==================== DATE OF BIRTH (OPTIONAL) ====================
  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateOfBirth?: Date;

  // ==================== SPECIES (OPTIONAL) ====================
  @Field({ nullable: true })
  @IsOptional()
  species?: string;

  // ==================== BREED (OPTIONAL) ====================
  @Field({ nullable: true })
  @IsOptional()
  breed?: string;

  // ==================== COLOR (OPTIONAL) ====================
  @Field({ nullable: true })
  @IsOptional()
  color?: string;

  // ==================== WEIGHT (OPTIONAL) ====================
  @Field(() => Int, { nullable: true })
  @IsOptional()
  weight?: number;

  // ==================== OWNER ID (OPTIONAL) ====================
  @Field(() => Int, { nullable: true })
  @IsOptional()
  ownerId?: number;
}
