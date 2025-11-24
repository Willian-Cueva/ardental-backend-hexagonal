import { DNI } from '../value-objects/dni';
import { Name } from '../value-objects/name';
import { AppointmentDate } from '../value-objects/appointment-date';
import { AppointmentTime } from '../value-objects/appointment-time';
import { AppointmentState } from '../value-objects/appointment-state';

/**
 * Entidad de Dominio: MedicalAppointment
 *
 * Representa una cita médica en el dominio de la clínica dental.
 * Es una entidad rica con comportamiento de negocio.
 * Siempre está en un estado válido (validación en constructor).
 */

export interface MedicalAppointmentProps {
  id?: string;
  dniPatient: DNI;
  namesPatient: Name;
  date: AppointmentDate;
  timeStart: AppointmentTime;
  observations?: string;
  state: AppointmentState;
  __v?: number;  // Mongoose version key
  createdAt?: Date;  // Mongoose timestamp
}

export class MedicalAppointment {
  private readonly id?: string;
  private readonly dniPatient: DNI;
  private readonly namesPatient: Name;
  private readonly date: AppointmentDate;
  private readonly timeStart: AppointmentTime;
  private observations: string;
  private state: AppointmentState;
  private readonly __v?: number;  // Mongoose version key
  private readonly createdAt?: Date;  // Mongoose timestamp

  private constructor(props: MedicalAppointmentProps) {
    this.id = props.id;
    this.dniPatient = props.dniPatient;
    this.namesPatient = props.namesPatient;
    this.date = props.date;
    this.timeStart = props.timeStart;
    this.observations = props.observations || '';
    this.state = props.state;
    this.__v = props.__v ?? 0;  // Default 0 si no viene de la BD
    this.createdAt = props.createdAt;  // Timestamp de MongoDB
  }

  /**
   * Factory method para crear una nueva cita
   */
  static create(props: Omit<MedicalAppointmentProps, 'state'>): MedicalAppointment {
    return new MedicalAppointment({
      ...props,
      state: AppointmentState.createPending(),
    });
  }

  /**
   * Factory method para reconstruir una cita desde persistencia
   */
  static reconstruct(props: MedicalAppointmentProps & { id: string }): MedicalAppointment {
    return new MedicalAppointment(props);
  }

  // ============ Getters ============

  getId(): string | undefined {
    return this.id;
  }

  getPatientDNI(): DNI {
    return this.dniPatient;
  }

  getPatientName(): Name {
    return this.namesPatient;
  }

  getDate(): AppointmentDate {
    return this.date;
  }

  getTimeStart(): AppointmentTime {
    return this.timeStart;
  }

  getObservations(): string {
    return this.observations;
  }

  getState(): AppointmentState {
    return this.state;
  }

  getMonth(): number {
    return this.date.getMonth();
  }

  getYear(): number {
    return this.date.getYear();
  }

  getDay(): number {
    return this.date.getDay();
  }

  // ============ Comportamiento de Dominio ============

  /**
   * Marca la cita como atendida
   */
  markAsAttended(): void {
    if (this.state.isAttended()) {
      throw new Error('La cita ya está marcada como atendida');
    }

    this.state = AppointmentState.create('SE PRESENTO');
  }

  /**
   * Marca la cita como no atendida
   */
  markAsNotAttended(): void {
    if (this.state.isNotAttended()) {
      throw new Error('La cita ya está marcada como no atendida');
    }

    this.state = AppointmentState.create('NO SE PRESENTO');
  }

  /**
   * Actualiza las observaciones de la cita
   */
  updateObservations(observations: string): void {
    this.observations = observations || '';
  }

  /**
   * Verifica si la cita está pendiente
   */
  isPending(): boolean {
    return this.state.isPending();
  }

  /**
   * Verifica si la cita fue atendida
   */
  wasAttended(): boolean {
    return this.state.isAttended();
  }

  /**
   * Verifica si el paciente no asistió
   */
  wasNotAttended(): boolean {
    return this.state.isNotAttended();
  }

  /**
   * Verifica si la cita pertenece a un paciente específico
   */
  belongsToPatient(dni: DNI): boolean {
    return this.dniPatient.equals(dni);
  }

  /**
   * Verifica si la cita es en el mismo día, mes y año
   */
  isOnDate(day: number, month: number, year: number): boolean {
    return (
      this.date.getDay() === day &&
      this.date.getMonth() === month &&
      this.date.getYear() === year
    );
  }

  /**
   * Convierte la entidad a un objeto plano para persistencia
   */
  toPrimitives(): {
    _id?: string;
    dniPatient: string;
    namesPatient: string;
    date: { day: string; month: string; year: string };
    timeStart: string;
    observations: string;
    state: string;
    __v: number;
    createdAt?: string;
  } {
    return {
      _id: this.id,
      dniPatient: this.dniPatient.getValue(),
      namesPatient: this.namesPatient.getValue(),
      date: this.date.toDTO(),
      timeStart: this.timeStart.getValue(),
      observations: this.observations,
      state: this.state.getValue(),
      __v: this.__v ?? 0,
      createdAt: this.createdAt?.toISOString(),
    };
  }
}
