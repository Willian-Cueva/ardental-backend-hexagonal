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
   * Crea un Phone validado (PARA NUEVOS DATOS - Validación estricta)
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
   * Reconstruye un Phone desde persistencia (PARA DATOS DE BD - Validación permisiva)
   * Tolera datos legacy con formato incorrecto mediante normalización
   * @param value - String con el teléfono desde la base de datos
   */
  static fromPersistence(value: string): Phone {
    if (!value || typeof value !== 'string') {
      console.warn('[Phone.fromPersistence] Teléfono vacío o inválido, usando valor por defecto');
      return new Phone('0000000000');
    }

    // Normalizar: eliminar espacios y caracteres no numéricos
    const normalized = value.trim().replace(/\D/g, '');

    // Si después de normalizar está vacío, usar valor por defecto
    if (normalized.length === 0) {
      console.warn(`[Phone.fromPersistence] Teléfono "${value}" no contiene dígitos, usando valor por defecto`);
      return new Phone('0000000000');
    }

    // Si tiene menos de 10 dígitos, hacer padding con ceros a la izquierda
    if (normalized.length < 10) {
      const padded = normalized.padStart(10, '0');
      console.warn(`[Phone.fromPersistence] Teléfono "${value}" tiene ${normalized.length} dígitos, usando padding: ${padded}`);
      return new Phone(padded);
    }

    // Si tiene más de 10 dígitos, tomar solo los primeros 10
    if (normalized.length > 10) {
      const truncated = normalized.substring(0, 10);
      console.warn(`[Phone.fromPersistence] Teléfono "${value}" tiene ${normalized.length} dígitos, truncando a: ${truncated}`);
      return new Phone(truncated);
    }

    // Exactamente 10 dígitos
    return new Phone(normalized);
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
