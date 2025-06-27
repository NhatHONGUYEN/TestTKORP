export const ANIMAL_SPECIES = [
  'Dog',
  'Cat',
  'Bird',
  'Rabbit',
  'Hamster',
  'Turtle',
] as const;

export type AnimalSpecies = (typeof ANIMAL_SPECIES)[number];

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
