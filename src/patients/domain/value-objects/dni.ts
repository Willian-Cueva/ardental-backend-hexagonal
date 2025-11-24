/**
 * Value Object: DNI (Documento Nacional de Identidad de Ecuador)
 *
 * Representa un DNI ecuatoriano válido con validación de checksum.
 * Es inmutable y garantiza que siempre contiene un DNI válido.
 */
export class DNI {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Crea un DNI validado (PARA NUEVOS DATOS - Validación estricta)
   * @param value - String de 10 dígitos que representa el DNI
   * @throws Error si el DNI no es válido
   */
  static create(value: string): DNI {
    if (!value || typeof value !== 'string') {
      throw new Error('El DNI es requerido y debe ser un string');
    }

    if (!this.isValid(value)) {
      throw new Error('Debe ingresar una cédula válida de 10 dígitos');
    }

    return new DNI(value);
  }

  /**
   * Reconstruye un DNI desde persistencia (PARA DATOS DE BD - Validación básica)
   * En arquitectura hexagonal, confiamos en que los datos ya fueron validados al insertarse.
   * Solo validamos formato básico para evitar errores.
   * @param value - String de 10 dígitos desde la base de datos
   */
  static fromPersistence(value: string): DNI {
    if (!value || typeof value !== 'string') {
      throw new Error('El DNI es requerido y debe ser un string');
    }

    // Solo validar que tenga 10 dígitos numéricos (sin validar checksum)
    if (!/^\d{10}$/.test(value)) {
      throw new Error('El DNI debe tener 10 dígitos numéricos');
    }

    return new DNI(value);
  }

  /**
   * Valida el formato y checksum del DNI ecuatoriano
   */
  private static isValid(dni: string): boolean {
    if (!/^\d{10}$/.test(dni)) {
      return false;
    }

    const digits = dni.split('').map(Number);
    const provinceCode = parseInt(dni.substring(0, 2), 10);

    // Validar código de provincia (01-24)
    if (provinceCode < 1 || provinceCode > 24) {
      return false;
    }

    // Algoritmo de validación del dígito verificador
    const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let sum = 0;

    for (let i = 0; i < 9; i++) {
      let value = digits[i] * coefficients[i];
      if (value >= 10) {
        value -= 9;
      }
      sum += value;
    }

    const checkDigit = sum % 10 === 0 ? 0 : 10 - (sum % 10);
    return checkDigit === digits[9];
  }

  getValue(): string {
    return this.value;
  }

  equals(other: DNI): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
