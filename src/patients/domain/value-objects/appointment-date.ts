/**
 * Value Object: AppointmentDate
 *
 * Representa una fecha de cita médica con día, mes y año.
 * Es inmutable y garantiza que la fecha es válida.
 */
export class AppointmentDate {
  private readonly day: number;
  private readonly month: number;
  private readonly year: number;

  private constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  /**
   * Crea un AppointmentDate validado
   * @param day - Día (1-31)
   * @param month - Mes (1-12)
   * @param year - Año (ej: 2024)
   * @throws Error si la fecha no es válida
   */
  static create(day: string | number, month: string | number, year: string | number): AppointmentDate {
    const dayNum = typeof day === 'string' ? parseInt(day, 10) : day;
    const monthNum = typeof month === 'string' ? parseInt(month, 10) : month;
    const yearNum = typeof year === 'string' ? parseInt(year, 10) : year;

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
      throw new Error('El día, mes y año deben ser valores numéricos');
    }

    if (!this.isValid(dayNum, monthNum, yearNum)) {
      throw new Error('La fecha de la cita no es válida');
    }

    return new AppointmentDate(dayNum, monthNum, yearNum);
  }

  /**
   * Valida que la fecha sea válida
   */
  private static isValid(day: number, month: number, year: number): boolean {
    if (month < 1 || month > 12) {
      return false;
    }

    if (day < 1 || day > 31) {
      return false;
    }

    if (year < 1900 || year > 2100) {
      return false;
    }

    // Validar días del mes
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
      return false;
    }

    return true;
  }

  getDay(): number {
    return this.day;
  }

  getMonth(): number {
    return this.month;
  }

  getYear(): number {
    return this.year;
  }

  /**
   * Retorna la fecha en formato para persistencia (strings SIN padding para coincidir con BD existente)
   */
  toDTO(): { day: string; month: string; year: string } {
    return {
      day: this.day.toString(),
      month: this.month.toString(),
      year: this.year.toString(),
    };
  }

  equals(other: AppointmentDate): boolean {
    return this.day === other.day
      && this.month === other.month
      && this.year === other.year;
  }

  toString(): string {
    return `${this.year}-${this.month.toString().padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`;
  }
}
