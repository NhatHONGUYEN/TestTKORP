import {
  InputType,
  Field,
  Int,
  PartialType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { CreateAnimalInput } from './create-animal.input';
import { IsOptional, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import {
  AnimalColor,
  AnimalSpecies,
  VALIDATION_MESSAGES,
} from 'src/common/types/validation';

@InputType()
export class UpdateAnimalInput extends PartialType(CreateAnimalInput) {
  // ==================== ID ====================
  @Field(() => Int)
  @Type(() => Number)
  @IsInt({ message: VALIDATION_MESSAGES.ID_INVALID })
  @IsPositive({ message: VALIDATION_MESSAGES.ID_INVALID })
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
  species?: AnimalSpecies;

  // ==================== RACE (OPTIONNEL) ====================
  @Field({ nullable: true })
  @IsOptional()
  breed?: string;

  // ==================== COULEUR (OPTIONNEL) ====================
  @Field({ nullable: true })
  @IsOptional()
  color?: AnimalColor;

  // ==================== POIDS (OPTIONNEL) ====================
  @Field(() => Int, { nullable: true })
  @IsOptional()
  weight?: number;

  // ==================== ID DU PROPRIÉTAIRE (OPTIONNEL) ====================
  @Field(() => Int, { nullable: true })
  @IsOptional()
  ownerId?: number;
}
