import { ANIMAL_SPECIES, ANIMAL_COLORS } from './animal.types';
import { VALIDATION_LIMITS } from './limits.types';

export const VALIDATION_MESSAGES = {
  // Messages génériques
  REQUIRED: (field: string) => `${field} est requis`,
  INVALID_FORMAT: (field: string) => `Format de ${field} invalide`,
  TOO_SHORT: (field: string, min: number) =>
    `${field} doit contenir au moins ${min} caractères`,
  TOO_LONG: (field: string, max: number) =>
    `${field} ne peut pas dépasser ${max} caractères`,

  // Messages spécifiques
  EMAIL_INVALID: "Format d'email invalide",
  PHONE_INVALID: 'Format de téléphone invalide (ex: 555-0123)',
  DATE_INVALID: 'Format de date invalide',
  DATE_FUTURE: 'La date ne peut pas être dans le futur',
  DATE_TOO_OLD: 'La date est trop ancienne',

  // Messages pour les animaux
  SPECIES_INVALID: `L'espèce doit être l'une des suivantes: ${ANIMAL_SPECIES.join(', ')}`,
  COLOR_INVALID: `La couleur doit être l'une des suivantes: ${ANIMAL_COLORS.join(', ')}`,
  WEIGHT_INVALID: 'Le poids doit être un nombre positif',
  WEIGHT_TOO_LOW: `Le poids minimum est de ${VALIDATION_LIMITS.WEIGHT_MIN} gramme`,
  WEIGHT_TOO_HIGH: `Le poids maximum est de ${VALIDATION_LIMITS.WEIGHT_MAX} grammes`,

  // Messages pour les propriétaires
  OWNER_ID_INVALID: "L'ID du propriétaire doit être un nombre entier positif",
  ID_INVALID: "L'ID doit être un nombre entier positif",
} as const;
