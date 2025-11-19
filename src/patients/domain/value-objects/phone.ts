/**
 * Value Object: Phone
 *
 * Representa un número de teléfono válido (10 dígitos).
 * Es inmutable y garantiza que siempre contiene un teléfono válido.
 */
export class Phone {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Crea un Phone validado
   * @param value - String de 10 dígitos
   * @throws Error si el teléfono no es válido
   */
  static create(value: string): Phone {
    if (!value || typeof value !== 'string') {
      throw new Error('El teléfono es requerido');
    }

    if (!this.isValid(value)) {
      throw new Error('El teléfono debe tener exactamente 10 dígitos numéricos');
    }

    return new Phone(value);
  }

  /**
   * Valida que el teléfono tenga el formato correcto
   */
  private static isValid(phone: string): boolean {
    return /^\d{10}$/.test(phone);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Phone): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
