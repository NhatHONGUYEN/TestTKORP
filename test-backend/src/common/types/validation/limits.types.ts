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
