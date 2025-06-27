import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  Length,
} from 'class-validator';

@InputType()
export class CreateOwnerInput {
  // ==================== PRÉNOM ====================
  @Field()
  @IsNotEmpty({ message: 'Le prénom est requis' })
  @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
  @Length(1, 100, {
    message: 'Le prénom doit contenir entre 1 et 100 caractères',
  })
  @Matches(/^[a-zA-ZÀ-ÿ\s\-']+$/, {
    message:
      "Le prénom ne peut contenir que des lettres, espaces, traits d'union et apostrophes",
  })
  firstName: string;

  // ==================== NOM ====================
  @Field()
  @IsNotEmpty({ message: 'Le nom est requis' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @Length(1, 100, {
    message: 'Le nom doit contenir entre 1 et 100 caractères',
  })
  @Matches(/^[a-zA-ZÀ-ÿ\s\-']+$/, {
    message:
      "Le nom ne peut contenir que des lettres, espaces, traits d'union et apostrophes",
  })
  lastName: string;

  // ==================== EMAIL ====================
  @Field()
  @IsNotEmpty({ message: "L'email est requis" })
  @IsEmail({}, { message: "Format d'email invalide" })
  @Length(1, 255, {
    message: "L'email ne peut pas dépasser 255 caractères",
  })
  email: string;

  // ==================== TÉLÉPHONE ====================
  @Field()
  @IsNotEmpty({ message: 'Le numéro de téléphone est requis' })
  @IsString({
    message: 'Le numéro de téléphone doit être une chaîne de caractères',
  })
  @Matches(/^\d{3}-\d{4}$/, {
    message: 'Format de téléphone invalide (ex: 555-0123)',
  })
  phoneNumber: string;
}
