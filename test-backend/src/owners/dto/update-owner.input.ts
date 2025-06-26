import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateOwnerInput } from './create-owner.input';
import { PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {
  @Field(() => Int)
  id: number;
}
