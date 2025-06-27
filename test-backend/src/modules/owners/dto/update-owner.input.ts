import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateOwnerInput } from './create-owner.input';
import { IsOptional, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {
  @Field(() => Int)
  @Type(() => Number)
  @IsInt({ message: "L'ID doit être un nombre entier" })
  @IsPositive({ message: "L'ID doit être un nombre positif" })
  id: number;

  // Tous les autres champs héritent de CreateOwnerInput mais deviennent optionnels
  @Field({ nullable: true })
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  phoneNumber?: string;
}
