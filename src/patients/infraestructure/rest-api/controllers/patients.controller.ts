import { Request, Response } from 'express';
import { GetAllPatientsUseCase } from '../../../app/use-cases/get-all-patients.use-case';
import { PatientRepository } from '../../../domain/repositories/patient.repository';

/**
 * Controlador: PatientsController
 *
 * Responsabilidad: Manejar las peticiones HTTP relacionadas con pacientes.
 *
 * En arquitectura hexagonal:
 * - Es un ADAPTADOR DE ENTRADA (driven adapter)
 * - Traduce peticiones HTTP a llamadas de casos de uso
 * - NO contiene lógica de negocio
 *
 * Inyección de Dependencias:
 * - Recibe el repositorio a través del constructor (Dependency Inversion)
 * - NO instancia directamente MongoDBPatientRepository
 * - Depende de la interfaz PatientRepository (puerto)
 */
export class PatientsController {
  constructor(private readonly patientRepository: PatientRepository) {}

  async getAllPatients(_req: Request, res: Response): Promise<void> {
    try {
      // Instanciar el caso de uso con el repositorio inyectado
      const useCase = new GetAllPatientsUseCase(this.patientRepository);

      // Ejecutar el caso de uso
      const patients = await useCase.execute();

      // Convertir entidades de dominio a DTOs para la respuesta
      const patientsDTO = patients.map((patient) => patient.toPrimitives());

      // Retornar respuesta HTTP
      res.status(200).json({
        status: 'ok',
        data: patientsDTO,
      });
    } catch (error) {
      console.error('(PatientsController) Error al obtener pacientes:', error);

      res.status(500).json({
        status: 'Error',
        data: null,
      });
    }
  }
}
