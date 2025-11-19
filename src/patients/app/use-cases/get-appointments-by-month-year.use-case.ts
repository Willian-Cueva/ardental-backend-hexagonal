import { MedicalAppointment } from '../../domain/entities/medical-appointment.entity';
import { MedicalAppointmentRepository } from '../../domain/repositories/medical-appointment.repository';

/**
 * Caso de Uso: GetAppointmentsByMonthAndYear
 *
 * Responsabilidad: Obtener las citas médicas de un mes y año específicos.
 *
 * Nota: Este caso de uso delega la lógica de filtrado al repositorio
 * para aprovechar las capacidades de consulta de la base de datos.
 */
export class GetAppointmentsByMonthAndYearUseCase {
  constructor(private readonly appointmentRepository: MedicalAppointmentRepository) {}

  async execute(month: number, year: number): Promise<MedicalAppointment[]> {
    // Validar parámetros
    if (month < 1 || month > 12) {
      throw new Error('El mes debe estar entre 1 y 12');
    }

    if (year < 1900 || year > 2100) {
      throw new Error('El año no es válido');
    }

    return await this.appointmentRepository.findByMonthAndYear(month, year);
  }
}
