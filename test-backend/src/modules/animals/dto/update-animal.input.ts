import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateAnimalInput } from './create-animal.input';
import { PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAnimalInput extends PartialType(CreateAnimalInput) {
  @Field(() => Int)
  id: number;
}
