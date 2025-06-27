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
  AnimalSpecies,
  AnimalColor,
  VALIDATION_MESSAGES,
} from '../../../common/types/validation.constants';

@InputType()
export class UpdateAnimalInput extends PartialType(CreateAnimalInput) {
  @Field(() => Int)
  @Type(() => Number)
  @IsInt({ message: VALIDATION_MESSAGES.ID_INVALID })
  @IsPositive({ message: VALIDATION_MESSAGES.ID_INVALID })
  id: number;

  // Les champs suivants sont automatiquement optionnels grâce à PartialType
  // et héritent de toutes les validations de CreateAnimalInput
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateOfBirth?: Date;

  @Field({ nullable: true })
  @IsOptional()
  species?: AnimalSpecies;

  @Field({ nullable: true })
  @IsOptional()
  breed?: string;

  @Field({ nullable: true })
  @IsOptional()
  color?: AnimalColor;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  weight?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  ownerId?: number;
}
