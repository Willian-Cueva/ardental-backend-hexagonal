/**
 * Value Object: AppointmentTime
 *
 * Representa una hora de cita en formato HH:MM.
 * Es inmutable y garantiza que la hora es válida.
 */
export class AppointmentTime {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Crea un AppointmentTime validado
   * @param value - String en formato HH:MM (00:00 - 23:59)
   * @throws Error si el formato no es válido
   */
  static create(value: string): AppointmentTime {
    if (!value || typeof value !== 'string') {
      throw new Error('La hora de inicio es requerida');
    }

    if (!this.isValid(value)) {
      throw new Error('El formato de la hora de inicio debe ser HH:MM (00:00 - 23:59)');
    }

    return new AppointmentTime(value);
  }

  /**
   * Valida el formato HH:MM
   */
  private static isValid(time: string): boolean {
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: AppointmentTime): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  /**
   * Obtiene la hora como número (ej: "14:30" -> 14.5)
   */
  toDecimal(): number {
    const [hours, minutes] = this.value.split(':').map(Number);
    return hours + minutes / 60;
  }
}
