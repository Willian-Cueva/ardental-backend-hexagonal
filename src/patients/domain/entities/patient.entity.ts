import { DNI } from '../value-objects/dni';
import { Name } from '../value-objects/name';
import { Phone } from '../value-objects/phone';
import { DateOfBirth } from '../value-objects/date-of-birth';
import { MaritalStatus } from '../value-objects/marital-status';
import { Sex } from '../value-objects/sex';

/**
 * Entidad de Dominio: Patient
 *
 * Representa un paciente en el dominio de Ardental.
 * Es una entidad rica con comportamiento de negocio.
 * Siempre está en un estado válido (validación en constructor).
 */

export interface PatientProps {
  id?: string;
  names: Name;
  profession: string;
  dni: DNI;
  phone: Phone;
  dateBorn: DateOfBirth;
  direction: string;
  maritalStatus: MaritalStatus;
  sex: Sex;
  reason: string;
  __v?: number;  // Mongoose version key
  createdAt?: Date;  // Mongoose timestamp
}

export class Patient {
  private readonly id?: string;
  private names: Name;
  private profession: string;
  private dni: DNI;
  private phone: Phone;
  private dateBorn: DateOfBirth;
  private direction: string;
  private maritalStatus: MaritalStatus;
  private sex: Sex;
  private reason: string;
  private readonly __v?: number;  // Mongoose version key
  private readonly createdAt?: Date;  // Mongoose timestamp

  private constructor(props: PatientProps) {
    this.id = props.id;
    this.names = props.names;
    this.profession = props.profession;
    this.dni = props.dni;
    this.phone = props.phone;
    this.dateBorn = props.dateBorn;
    this.direction = props.direction;
    this.maritalStatus = props.maritalStatus;
    this.sex = props.sex;
    this.reason = props.reason;
    this.__v = props.__v ?? 0;  // Default 0 si no viene de la BD
    this.createdAt = props.createdAt;  // Timestamp de MongoDB

    this.validate();
  }

  /**
   * Factory method para crear un nuevo paciente
   */
  static create(props: PatientProps): Patient {
    return new Patient(props);
  }

  /**
   * Factory method para reconstruir un paciente desde persistencia
   */
  static reconstruct(props: PatientProps & { id: string }): Patient {
    return new Patient(props);
  }

  /**
   * Validación de reglas de negocio
   *
   * IMPORTANTE: Esta validación es permisiva para tolerar datos legacy.
   * Los campos profession, direction y reason pueden estar vacíos en datos legacy.
   * La validación estricta ocurre en los métodos update*() cuando el usuario modifica datos.
   */
  private validate(): void {
    // Permitir campos vacíos para datos legacy (fromPersistence)
    // Solo validar que sean strings
    if (typeof this.profession !== 'string') {
      throw new Error('La profesión debe ser un string');
    }

    if (typeof this.direction !== 'string') {
      throw new Error('La dirección debe ser un string');
    }

    if (typeof this.reason !== 'string') {
      throw new Error('El motivo de consulta debe ser un string');
    }
  }

  // ============ Getters ============

  getId(): string | undefined {
    return this.id;
  }

  getNames(): Name {
    return this.names;
  }

  getProfession(): string {
    return this.profession;
  }

  getDNI(): DNI {
    return this.dni;
  }

  getPhone(): Phone {
    return this.phone;
  }

  getDateOfBirth(): DateOfBirth {
    return this.dateBorn;
  }

  getDirection(): string {
    return this.direction;
  }

  getMaritalStatus(): MaritalStatus {
    return this.maritalStatus;
  }

  getSex(): Sex {
    return this.sex;
  }

  getReason(): string {
    return this.reason;
  }

  // ============ Comportamiento de Dominio ============

  /**
   * Actualiza la información de contacto del paciente
   */
  updateContactInfo(phone: Phone, direction: string): void {
    if (!direction || direction.trim().length === 0) {
      throw new Error('La dirección es requerida');
    }

    this.phone = phone;
    this.direction = direction.trim();
  }

  /**
   * Actualiza el motivo de consulta
   */
  updateReason(reason: string): void {
    if (!reason || reason.trim().length === 0) {
      throw new Error('El motivo de consulta es requerido');
    }

    this.reason = reason.trim();
  }

  /**
   * Actualiza el estado civil
   */
  updateMaritalStatus(maritalStatus: MaritalStatus): void {
    this.maritalStatus = maritalStatus;
  }

  /**
   * Calcula la edad del paciente
   */
  getAge(): number {
    return this.dateBorn.getAge();
  }

  /**
   * Verifica si el paciente es mayor de edad
   */
  isAdult(): boolean {
    return this.getAge() >= 18;
  }

  /**
   * Compara si dos pacientes son el mismo (por DNI)
   */
  equals(other: Patient): boolean {
    if (!other) return false;
    return this.dni.equals(other.dni);
  }

  /**
   * Convierte la entidad a un objeto plano para persistencia
   * Nota: Este método existe para facilitar la integración con adaptadores,
   * pero idealmente el adaptador debería conocer cómo extraer los datos.
   */
  toPrimitives(): {
    _id?: string;
    names: string;
    profession: string;
    dni: string;
    phone: string;
    dateBorn: string;
    direction: string;
    maritalStatus: string;
    sex: string;
    reason: string;
    __v: number;
    createdAt?: string;
    version: number;
  } {
    return {
      _id: this.id,
      names: this.names.getValue(),
      profession: this.profession,
      dni: this.dni.getValue(),
      phone: this.phone.getValue(),
      dateBorn: this.dateBorn.getValue(),
      direction: this.direction,
      maritalStatus: this.maritalStatus.getValue(),
      sex: this.sex.getValue(),
      reason: this.reason,
      __v: this.__v ?? 0,
      createdAt: this.createdAt?.toISOString(),
      version: 2,
    };
  }
}
