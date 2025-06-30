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

  // ==================== FIRST NAME (OPTIONAL) ====================
  @Field({ nullable: true })
  @IsOptional()
  firstName?: string;

  // ==================== LAST NAME (OPTIONAL) ====================
  @Field({ nullable: true })
  @IsOptional()
  lastName?: string;

  // ==================== EMAIL (OPTIONAL) ====================
  @Field({ nullable: true })
  @IsOptional()
  email?: string;

  // ==================== PHONE NUMBER (OPTIONAL) ====================
  @Field({ nullable: true })
  @IsOptional()
  phoneNumber?: string;
}
