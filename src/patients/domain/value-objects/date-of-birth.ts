/**
 * Value Object: DateOfBirth
 *
 * Representa una fecha de nacimiento válida.
 * Es inmutable y garantiza que la fecha es válida y no es futura.
 */
export class DateOfBirth {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Crea un DateOfBirth validado (PARA NUEVOS DATOS - Validación estricta)
   * @param value - String con la fecha (formato ISO, YYYY-MM-DD o similar)
   * @throws Error si la fecha no es válida
   */
  static create(value: string): DateOfBirth {
    if (!value || typeof value !== 'string') {
      throw new Error('La fecha de nacimiento es requerida');
    }

    if (!this.isValid(value)) {
      throw new Error('La fecha de nacimiento no es válida o es futura');
    }

    return new DateOfBirth(value);
  }

  /**
   * Reconstruye un DateOfBirth desde persistencia (PARA DATOS DE BD - Validación permisiva)
   * Tolera fechas inválidas usando valor por defecto
   * @param value - String con la fecha desde la base de datos
   */
  static fromPersistence(value: string): DateOfBirth {
    if (!value || typeof value !== 'string') {
      console.warn('[DateOfBirth.fromPersistence] Fecha vacía o inválida, usando valor por defecto');
      return new DateOfBirth('1900-01-01');
    }

    // Verificar si la fecha es válida
    if (this.isValid(value)) {
      return new DateOfBirth(value);
    }

    // Si no es válida, usar fecha por defecto
    console.warn(`[DateOfBirth.fromPersistence] Fecha "${value}" inválida, usando valor por defecto`);
    return new DateOfBirth('1900-01-01');
  }

  /**
   * Valida que la fecha sea válida y no sea futura
   */
  private static isValid(date: string): boolean {
    const dateObj = new Date(date);

    // Verificar que la fecha es válida
    if (isNaN(dateObj.getTime())) {
      return false;
    }

    // Verificar que no es futura
    const now = new Date();
    if (dateObj > now) {
      return false;
    }

    return true;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: DateOfBirth): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  /**
   * Calcula la edad en años
   */
  getAge(): number {
    const birthDate = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
