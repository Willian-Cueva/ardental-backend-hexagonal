/**
 * Value Object: Name
 *
 * Representa un nombre válido con restricciones de negocio.
 * Es inmutable y garantiza que siempre contiene un nombre válido.
 */
export class Name {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Crea un Name validado (PARA NUEVOS DATOS - Validación estricta)
   * @param value - String con el nombre (2-50 caracteres alfabéticos)
   * @throws Error si el nombre no es válido
   */
  static create(value: string): Name {
    if (!value || typeof value !== 'string') {
      throw new Error('El nombre es requerido');
    }

    const trimmedValue = value.trim();

    if (!this.isValid(trimmedValue)) {
      throw new Error('El nombre debe tener entre 2 y 50 caracteres alfabéticos');
    }

    return new Name(trimmedValue);
  }

  /**
   * Reconstruye un Name desde persistencia (PARA DATOS DE BD - Validación básica)
   * @param value - String con el nombre desde la base de datos
   */
  static fromPersistence(value: string): Name {
    if (!value || typeof value !== 'string') {
      throw new Error('El nombre es requerido');
    }

    const trimmedValue = value.trim();

    // Validación básica: solo verificar que no esté vacío
    if (trimmedValue.length === 0) {
      throw new Error('El nombre no puede estar vacío');
    }

    return new Name(trimmedValue);
  }

  /**
   * Valida que el nombre tenga el formato correcto
   */
  private static isValid(name: string): boolean {
    // Permite letras (incluyendo acentos y ñ), espacios y guiones
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]{2,50}$/;
    return nameRegex.test(name);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Name): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
