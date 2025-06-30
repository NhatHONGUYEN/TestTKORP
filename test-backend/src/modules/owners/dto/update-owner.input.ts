import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateOwnerInput } from './create-owner.input';
import { IsOptional, IsInt, IsPositive } from 'class-validator';

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {
  // ==================== ID ====================
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id: number;

  // ==================== PRÉNOM (OPTIONNEL) ====================
  @Field({ nullable: true })
  @IsOptional()
  firstName?: string;

  // ==================== NOM (OPTIONNEL) ====================
  @Field({ nullable: true })
  @IsOptional()
  lastName?: string;

  // ==================== EMAIL (OPTIONNEL) ====================
  @Field({ nullable: true })
  @IsOptional()
  email?: string;

  // ==================== TÉLÉPHONE (OPTIONNEL) ====================
  @Field({ nullable: true })
  @IsOptional()
  phoneNumber?: string;
}
