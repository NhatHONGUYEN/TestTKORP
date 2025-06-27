export const VALIDATION_PATTERNS = {
  // Pattern pour le téléphone (format: 555-0123)
  PHONE: /^\d{3}-\d{4}$/,

  // Pattern pour les noms (lettres, espaces, traits d'union, apostrophes)
  NAME: /^[a-zA-ZÀ-ÿ\s\-']+$/,

  // Pattern pour les couleurs et espèces (lettres et espaces uniquement)
  ANIMAL_ATTRIBUTE: /^[a-zA-Z\s]+$/,
} as const;
