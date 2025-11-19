/**
 * Value Object: Sex
 *
 * Representa el sexo de un paciente.
 * Es inmutable y garantiza que solo contiene valores válidos.
 */
export enum SexEnum {
  MALE = 'Masculino',
  FEMALE = 'Femenino',
  OTHER = 'Otro',
}

export class Sex {
  private readonly value: SexEnum;

  private constructor(value: SexEnum) {
    this.value = value;
  }

  static create(value: string): Sex {
    if (!value) {
      throw new Error('El sexo es requerido');
    }

    const validValue = this.parseFromString(value);
    if (!validValue) {
      throw new Error(`Sexo inválido: ${value}. Valores permitidos: Masculino, Femenino, Otro`);
    }

    return new Sex(validValue);
  }

  private static parseFromString(value: string): SexEnum | null {
    const normalized = value.trim();

    switch (normalized) {
      case SexEnum.MALE:
        return SexEnum.MALE;
      case SexEnum.FEMALE:
        return SexEnum.FEMALE;
      case SexEnum.OTHER:
        return SexEnum.OTHER;
      default:
        return null;
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Sex): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
