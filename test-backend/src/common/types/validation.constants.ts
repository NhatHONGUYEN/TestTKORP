// Constantes pour les validations enterprise-ready

// Espèces d'animaux autorisées
export const ANIMAL_SPECIES = [
  'Dog',
  'Cat',
  'Bird',
  'Rabbit',
  'Hamster',
  'Turtle',
] as const;

export type AnimalSpecies = (typeof ANIMAL_SPECIES)[number];

// Couleurs d'animaux autorisées
export const ANIMAL_COLORS = [
  'Black',
  'White',
  'Brown',
  'Gray',
  'Golden',
  'Spotted',
  'Striped',
  'Multicolor',
] as const;

export type AnimalColor = (typeof ANIMAL_COLORS)[number];

// Limites de validation
export const VALIDATION_LIMITS = {
  // Limites pour les champs texte
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 100,

  // Limites pour l'email
  EMAIL_MAX_LENGTH: 255,

  // Limites pour le téléphone
  PHONE_MIN_LENGTH: 8,
  PHONE_MAX_LENGTH: 20,

  // Limites pour le poids (en grammes selon le test)
  WEIGHT_MIN: 1,
  WEIGHT_MAX: 100000, // 100kg en grammes

  // Limites pour les dates
  MIN_BIRTH_YEAR: 1900,
  MAX_BIRTH_YEAR: new Date().getFullYear(),
} as const;

// Messages d'erreur standardisés
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

// Regex patterns
export const VALIDATION_PATTERNS = {
  // Pattern pour le téléphone (format: 555-0123)
  PHONE: /^\d{3}-\d{4}$/,

  // Pattern pour les noms (lettres, espaces, traits d'union, apostrophes)
  NAME: /^[a-zA-ZÀ-ÿ\s\-']+$/,

  // Pattern pour les couleurs et espèces (lettres et espaces uniquement)
  ANIMAL_ATTRIBUTE: /^[a-zA-Z\s]+$/,
} as const;
