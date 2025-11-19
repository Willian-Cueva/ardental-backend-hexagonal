import { MedicalAppointment } from '../entities/medical-appointment.entity';
import { DNI } from '../value-objects/dni';

/**
 * Puerto (Interface): MedicalAppointmentRepository
 *
 * Define el contrato para la persistencia de citas médicas.
 * Esta es una interfaz del DOMINIO (Puerto) que será implementada
 * por la INFRAESTRUCTURA (Adaptador).
 */
export interface MedicalAppointmentRepository {
  /**
   * Guarda una nueva cita médica
   */
  save(appointment: MedicalAppointment): Promise<void>;

  /**
   * Busca una cita por su ID
   */
  findById(id: string): Promise<MedicalAppointment | null>;

  /**
   * Obtiene todas las citas médicas
   */
  findAll(): Promise<MedicalAppointment[]>;

  /**
   * Obtiene las citas de un mes y año específicos
   */
  findByMonthAndYear(month: number, year: number): Promise<MedicalAppointment[]>;

  /**
   * Obtiene las citas de un paciente específico
   */
  findByPatientDNI(dni: DNI): Promise<MedicalAppointment[]>;

  /**
   * Actualiza una cita existente
   */
  update(appointment: MedicalAppointment): Promise<void>;

  /**
   * Elimina una cita por su ID
   */
  delete(id: string): Promise<void>;
}
