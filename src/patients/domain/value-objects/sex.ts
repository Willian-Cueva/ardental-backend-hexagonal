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

  /**
   * Crea un Sex validado (PARA NUEVOS DATOS - Validación estricta)
   */
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

  /**
   * Reconstruye un Sex desde persistencia (PARA DATOS DE BD - Validación permisiva)
   * Tolera valores inesperados usando valor por defecto
   */
  static fromPersistence(value: string): Sex {
    if (!value || typeof value !== 'string') {
      console.warn('[Sex.fromPersistence] Sexo vacío, usando valor por defecto');
      return new Sex(SexEnum.OTHER);
    }

    const validValue = this.parseFromString(value);
    if (!validValue) {
      console.warn(`[Sex.fromPersistence] Sexo "${value}" no reconocido, usando valor por defecto`);
      return new Sex(SexEnum.OTHER);
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
