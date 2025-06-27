import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// Validateur pour vérifier que la date de naissance n'est pas dans le futur
@ValidatorConstraint({ name: 'isNotFutureDate', async: false })
export class IsNotFutureDateConstraint implements ValidatorConstraintInterface {
  validate(date: Date, _args: ValidationArguments) {
    if (!date) return false;
    const now = new Date();
    return date <= now;
  }

  defaultMessage(_args: ValidationArguments) {
    return 'La date de naissance ne peut pas être dans le futur';
  }
}

export function IsNotFutureDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotFutureDateConstraint,
    });
  };
}

// Validateur pour vérifier que la date n'est pas trop ancienne
@ValidatorConstraint({ name: 'isNotTooOld', async: false })
export class IsNotTooOldConstraint implements ValidatorConstraintInterface {
  validate(date: Date, _args: ValidationArguments) {
    if (!date) return false;
    const minYear = 1900;
    return date.getFullYear() >= minYear;
  }

  defaultMessage(_args: ValidationArguments) {
    return 'La date de naissance ne peut pas être antérieure à 1900';
  }
}

export function IsNotTooOld(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotTooOldConstraint,
    });
  };
}

// Validateur pour vérifier que le poids est réaliste selon l'espèce
@ValidatorConstraint({ name: 'isRealisticWeight', async: false })
export class IsRealisticWeightConstraint
  implements ValidatorConstraintInterface
{
  validate(weight: number, args: ValidationArguments) {
    if (!weight) return false;

    const object = args.object as { species?: string };
    const species = object.species;

    if (!species) return true; // Si pas d'espèce, on laisse passer

    // Limites de poids réalistes par espèce (en grammes)
    const weightLimits = {
      Dog: { min: 500, max: 90000 }, // 0.5kg - 90kg
      Cat: { min: 200, max: 15000 }, // 0.2kg - 15kg
      Bird: { min: 10, max: 20000 }, // 10g - 20kg
      Rabbit: { min: 100, max: 10000 }, // 100g - 10kg
      Hamster: { min: 20, max: 200 }, // 20g - 200g
      Turtle: { min: 50, max: 50000 }, // 50g - 50kg
    };

    const limits = weightLimits[species as keyof typeof weightLimits];
    if (!limits) return true; // Espèce inconnue, on laisse passer

    return weight >= limits.min && weight <= limits.max;
  }

  defaultMessage(args: ValidationArguments) {
    const object = args.object as { species?: string };
    const species = object.species;
    return `Le poids n'est pas réaliste pour un ${species}`;
  }
}

export function IsRealisticWeight(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRealisticWeightConstraint,
    });
  };
}

// Validateur pour vérifier l'unicité de l'email (à utiliser avec injection de dépendance)
@ValidatorConstraint({ name: 'isEmailUnique', async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  validate(_email: string, _args: ValidationArguments) {
    // Cette validation sera implémentée dans le service
    // car elle nécessite l'accès à la base de données
    return Promise.resolve(true);
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Cet email est déjà utilisé';
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}
