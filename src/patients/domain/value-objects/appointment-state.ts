/**
 * Value Object: AppointmentState
 *
 * Representa el estado de una cita médica.
 * Es inmutable y garantiza que solo contiene valores válidos.
 */
export enum AppointmentStateEnum {
  PENDING = 'PENDIENTE',
  ATTENDED = 'SE PRESENTO',
  NOT_ATTENDED = 'NO SE PRESENTO',
}

export class AppointmentState {
  private readonly value: AppointmentStateEnum;

  private constructor(value: AppointmentStateEnum) {
    this.value = value;
  }

  static create(value: string): AppointmentState {
    if (!value) {
      throw new Error('El estado de la cita es requerido');
    }

    const validValue = this.parseFromString(value);
    if (!validValue) {
      throw new Error(`Estado de cita inválido: ${value}. Valores permitidos: PENDIENTE, SE PRESENTO, NO SE PRESENTO`);
    }

    return new AppointmentState(validValue);
  }

  static createPending(): AppointmentState {
    return new AppointmentState(AppointmentStateEnum.PENDING);
  }

  private static parseFromString(value: string): AppointmentStateEnum | null {
    const normalized = value.trim().toUpperCase();

    switch (normalized) {
      case 'PENDIENTE':
        return AppointmentStateEnum.PENDING;
      case 'SE PRESENTO':
        return AppointmentStateEnum.ATTENDED;
      case 'NO SE PRESENTO':
        return AppointmentStateEnum.NOT_ATTENDED;
      default:
        return null;
    }
  }

  getValue(): string {
    return this.value;
  }

  isPending(): boolean {
    return this.value === AppointmentStateEnum.PENDING;
  }

  isAttended(): boolean {
    return this.value === AppointmentStateEnum.ATTENDED;
  }

  isNotAttended(): boolean {
    return this.value === AppointmentStateEnum.NOT_ATTENDED;
  }

  equals(other: AppointmentState): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
