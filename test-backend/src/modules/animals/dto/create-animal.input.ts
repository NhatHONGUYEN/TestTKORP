import { InputType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsInt,
  IsEnum,
  IsPositive,
  Length,
  Matches,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ANIMAL_COLORS,
  ANIMAL_SPECIES,
  AnimalColor,
  AnimalSpecies,
  VALIDATION_LIMITS,
  VALIDATION_MESSAGES,
  VALIDATION_PATTERNS,
} from 'src/common/types/validation';

@InputType()
export class CreateAnimalInput {
  // ==================== NOM ====================
  @Field()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED('nom') })
  @IsString()
  @Length(
    VALIDATION_LIMITS.NAME_MIN_LENGTH,
    VALIDATION_LIMITS.NAME_MAX_LENGTH,
    {
      message: VALIDATION_MESSAGES.TOO_LONG(
        'nom',
        VALIDATION_LIMITS.NAME_MAX_LENGTH,
      ),
    },
  )
  @Matches(VALIDATION_PATTERNS.NAME, {
    message: VALIDATION_MESSAGES.INVALID_FORMAT('nom'),
  })
  name: string;

  // ==================== DATE DE NAISSANCE ====================
  @Field(() => GraphQLISODateTime)
  @Type(() => Date)
  @IsDate({ message: VALIDATION_MESSAGES.DATE_INVALID })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED('date de naissance') })
  dateOfBirth: Date;

  // ==================== ESPÈCE ====================
  @Field()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED('espèce') })
  @IsEnum(ANIMAL_SPECIES, {
    message: VALIDATION_MESSAGES.SPECIES_INVALID,
  })
  species: AnimalSpecies;

  // ==================== RACE ====================
  @Field()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED('race') })
  @IsString()
  @Length(
    VALIDATION_LIMITS.NAME_MIN_LENGTH,
    VALIDATION_LIMITS.NAME_MAX_LENGTH,
    {
      message: VALIDATION_MESSAGES.TOO_LONG(
        'race',
        VALIDATION_LIMITS.NAME_MAX_LENGTH,
      ),
    },
  )
  @Matches(VALIDATION_PATTERNS.ANIMAL_ATTRIBUTE, {
    message: VALIDATION_MESSAGES.INVALID_FORMAT('race'),
  })
  breed: string;

  // ==================== COULEUR ====================
  @Field()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED('couleur') })
  @IsEnum(ANIMAL_COLORS, {
    message: VALIDATION_MESSAGES.COLOR_INVALID,
  })
  color: AnimalColor;

  // ==================== POIDS ====================
  @Field(() => Int)
  @Type(() => Number)
  @IsInt({ message: VALIDATION_MESSAGES.INVALID_FORMAT('poids') })
  @IsPositive({ message: VALIDATION_MESSAGES.WEIGHT_INVALID })
  @Min(VALIDATION_LIMITS.WEIGHT_MIN, {
    message: VALIDATION_MESSAGES.WEIGHT_TOO_LOW,
  })
  @Max(VALIDATION_LIMITS.WEIGHT_MAX, {
    message: VALIDATION_MESSAGES.WEIGHT_TOO_HIGH,
  })
  weight: number;

  // ==================== ID DU PROPRIÉTAIRE ====================
  @Field(() => Int)
  @Type(() => Number)
  @IsInt({ message: VALIDATION_MESSAGES.INVALID_FORMAT('ID du propriétaire') })
  @IsPositive({ message: VALIDATION_MESSAGES.OWNER_ID_INVALID })
  ownerId: number;
}
