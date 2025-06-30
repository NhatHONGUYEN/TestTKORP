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

  // ==================== NOM (OPTIONNEL) ====================
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  // ==================== DATE DE NAISSANCE (OPTIONNEL) ====================
  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateOfBirth?: Date;

  // ==================== ESPÈCE (OPTIONNEL) ====================
  @Field({ nullable: true })
  @IsOptional()
  species?: string;

  // ==================== RACE (OPTIONNEL) ====================
  @Field({ nullable: true })
  @IsOptional()
  breed?: string;

  // ==================== COULEUR (OPTIONNEL) ====================
  @Field({ nullable: true })
  @IsOptional()
  color?: string;

  // ==================== POIDS (OPTIONNEL) ====================
  @Field(() => Int, { nullable: true })
  @IsOptional()
  weight?: number;

  // ==================== ID DU PROPRIÉTAIRE (OPTIONNEL) ====================
  @Field(() => Int, { nullable: true })
  @IsOptional()
  ownerId?: number;
}
