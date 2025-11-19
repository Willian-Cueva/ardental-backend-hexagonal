import { Patient } from '../entities/patient.entity';
import { DNI } from '../value-objects/dni';

/**
 * Puerto (Interface): PatientRepository
 *
 * Define el contrato para la persistencia de pacientes.
 * Esta es una interfaz del DOMINIO (Puerto) que será implementada
 * por la INFRAESTRUCTURA (Adaptador).
 *
 * En arquitectura hexagonal:
 * - Esta interfaz pertenece al DOMINIO
 * - Las implementaciones concretas pertenecen a INFRAESTRUCTURA
 * - El dominio NO depende de la infraestructura
 */
export interface PatientRepository {
  /**
   * Guarda un nuevo paciente
   */
  save(patient: Patient): Promise<void>;

  /**
   * Busca un paciente por su ID
   */
  findById(id: string): Promise<Patient | null>;

  /**
   * Busca un paciente por su DNI
   */
  findByDNI(dni: DNI): Promise<Patient | null>;

  /**
   * Obtiene todos los pacientes
   */
  findAll(): Promise<Patient[]>;

  /**
   * Actualiza un paciente existente
   */
  update(patient: Patient): Promise<void>;

  /**
   * Elimina un paciente por su ID
   */
  delete(id: string): Promise<void>;

  /**
   * Verifica si existe un paciente con un DNI específico
   */
  existsByDNI(dni: DNI): Promise<boolean>;
}
