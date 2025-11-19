import { Patient } from '../../domain/entities/patient.entity';
import { PatientRepository } from '../../domain/repositories/patient.repository';

/**
 * Caso de Uso: GetAllPatients
 *
 * Responsabilidad: Obtener todos los pacientes del sistema.
 *
 * En arquitectura hexagonal:
 * - Pertenece a la CAPA DE APLICACIÓN
 * - Orquesta entidades de dominio y repositorios
 * - NO contiene lógica de negocio (eso es del dominio)
 * - NO conoce detalles de infraestructura (usa puertos/interfaces)
 *
 * Principio de Inversión de Dependencias:
 * - Depende de PatientRepository (interfaz/puerto)
 * - NO depende de MongoDBPatientRepository (implementación concreta)
 */
export class GetAllPatientsUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(): Promise<Patient[]> {
    return await this.patientRepository.findAll();
  }
}
