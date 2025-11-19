import { Request, Response } from 'express';
import { GetAllMedicalAppointmentsUseCase } from '../../../app/use-cases/get-all-medical-appointments.use-case';
import { GetAppointmentsByMonthAndYearUseCase } from '../../../app/use-cases/get-appointments-by-month-year.use-case';
import { MedicalAppointmentRepository } from '../../../domain/repositories/medical-appointment.repository';

/**
 * Controlador: MedicalAppointmentsController
 *
 * Responsabilidad: Manejar las peticiones HTTP relacionadas con citas médicas.
 */
export class MedicalAppointmentsController {
  constructor(private readonly appointmentRepository: MedicalAppointmentRepository) {}

  async getAllAppointments(_req: Request, res: Response): Promise<void> {
    try {
      const useCase = new GetAllMedicalAppointmentsUseCase(this.appointmentRepository);
      const appointments = await useCase.execute();

      const appointmentsDTO = appointments.map((appointment) => appointment.toPrimitives());

      res.status(200).json({
        message: 'Petición obtener citas médicas satisfactoria',
        data: appointmentsDTO,
      });
    } catch (error) {
      console.error('(MedicalAppointmentsController) Error al obtener citas:', error);

      res.status(500).json({
        message: error instanceof Error ? error.message : 'Error al obtener las citas médicas',
        data: null,
      });
    }
  }

  async getAppointmentsByMonthAndYear(req: Request, res: Response): Promise<void> {
    try {
      const { year, month } = req.params;

      // Validar parámetros
      const yearNum = parseInt(year, 10);
      const monthNum = parseInt(month, 10);

      if (isNaN(yearNum) || isNaN(monthNum)) {
        res.status(400).json({
          message: 'Los parámetros year y month deben ser números válidos',
          data: null,
        });
        return;
      }

      // Ejecutar caso de uso
      const useCase = new GetAppointmentsByMonthAndYearUseCase(this.appointmentRepository);
      const appointments = await useCase.execute(monthNum, yearNum);

      const appointmentsDTO = appointments.map((appointment) => appointment.toPrimitives());

      res.status(200).json({
        message: `Citas médicas de ${month}/${year} obtenidas satisfactoriamente`,
        data: appointmentsDTO,
      });
    } catch (error) {
      console.error('(MedicalAppointmentsController) Error al obtener citas por mes/año:', error);

      res.status(500).json({
        message: error instanceof Error ? error.message : 'Error al obtener las citas médicas',
        data: null,
      });
    }
  }
}
