/**
 * Value Object: MaritalStatus
 *
 * Representa el estado civil de un paciente.
 * Es inmutable y garantiza que solo contiene valores válidos.
 */
export enum MaritalStatusEnum {
  SINGLE = 'Soltero/a',
  MARRIED = 'Casado/a',
  DIVORCED = 'Divorciado/a',
  WIDOWED = 'Viudo/a',
}

export class MaritalStatus {
  private readonly value: MaritalStatusEnum;

  private constructor(value: MaritalStatusEnum) {
    this.value = value;
  }

  static create(value: string): MaritalStatus {
    if (!value) {
      throw new Error('El estado civil es requerido');
    }

    const validValue = this.parseFromString(value);
    if (!validValue) {
      throw new Error(`Estado civil inválido: ${value}. Valores permitidos: Soltero/a, Casado/a, Divorciado/a, Viudo/a`);
    }

    return new MaritalStatus(validValue);
  }

  private static parseFromString(value: string): MaritalStatusEnum | null {
    const normalized = value.trim();

    switch (normalized) {
      case MaritalStatusEnum.SINGLE:
        return MaritalStatusEnum.SINGLE;
      case MaritalStatusEnum.MARRIED:
        return MaritalStatusEnum.MARRIED;
      case MaritalStatusEnum.DIVORCED:
        return MaritalStatusEnum.DIVORCED;
      case MaritalStatusEnum.WIDOWED:
        return MaritalStatusEnum.WIDOWED;
      default:
        return null;
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: MaritalStatus): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
