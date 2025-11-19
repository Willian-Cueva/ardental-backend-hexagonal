import { MedicalAppointment } from '../../domain/entities/medical-appointment.entity';
import { MedicalAppointmentRepository } from '../../domain/repositories/medical-appointment.repository';

/**
 * Caso de Uso: GetAllMedicalAppointments
 *
 * Responsabilidad: Obtener todas las citas médicas del sistema.
 */
export class GetAllMedicalAppointmentsUseCase {
  constructor(private readonly appointmentRepository: MedicalAppointmentRepository) {}

  async execute(): Promise<MedicalAppointment[]> {
    return await this.appointmentRepository.findAll();
  }
}
