export const VALIDATION_PATTERNS = {
  // Pattern plus flexible pour le téléphone
  PHONE: /^\d{3}-?\d{4}$/, // Accepte avec ou sans tiret

  // Pattern plus flexible pour les noms
  NAME: /^[a-zA-ZÀ-ÿ0-9\s\-'.]+$/, // Accepte aussi chiffres et points

  // Pattern pour les couleurs et espèces (lettres et espaces uniquement)
  ANIMAL_ATTRIBUTE: /^[a-zA-Z\s]+$/,
} as const;
