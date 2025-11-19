/**
 * Composition Root / Dependency Injection Container
 *
 * Este es el ÚNICO lugar donde se instancian las implementaciones concretas.
 *
 * Principios aplicados:
 * 1. Dependency Inversion Principle (DIP) - Las capas superiores dependen de abstracciones
 * 2. Single Responsibility - Este módulo solo configura dependencias
 * 3. Composition Root Pattern - Un único punto de entrada para la configuración
 *
 * En arquitectura hexagonal:
 * - Este módulo "conecta" los puertos con sus adaptadores
 * - Aquí es donde se decide qué implementación usar (MongoDB, MySQL, etc.)
 * - El resto de la aplicación NO conoce las implementaciones concretas
 */

// Repositorios (Puertos)
import { PatientRepository } from '../../patients/domain/repositories/patient.repository';
import { MedicalAppointmentRepository } from '../../patients/domain/repositories/medical-appointment.repository';

// Implementaciones de Repositorios (Adaptadores)
import { MongoDBPatientRepository } from '../../patients/infraestructure/repositories/mongodb-patient.repository';
import { MongoDBMedicalAppointmentRepository } from '../../patients/infraestructure/repositories/mongodb-medical-appointment.repository';

// Controladores
import { PatientsController } from '../../patients/infraestructure/rest-api/controllers/patients.controller';
import { MedicalAppointmentsController } from '../../patients/infraestructure/rest-api/controllers/medical-appointments.controller';

/**
 * Container para las dependencias de la aplicación
 *
 * Este objeto singleton contiene todas las instancias configuradas.
 */
class DependencyContainer {
  private static instance: DependencyContainer;

  // Repositorios
  public readonly patientRepository: PatientRepository;
  public readonly medicalAppointmentRepository: MedicalAppointmentRepository;

  // Controladores
  public readonly patientsController: PatientsController;
  public readonly medicalAppointmentsController: MedicalAppointmentsController;

  private constructor() {
    // ============ CONFIGURACIÓN DE REPOSITORIOS ============
    // Aquí se decide qué implementación usar
    // Para cambiar de MongoDB a otra DB, solo se cambia aquí

    this.patientRepository = new MongoDBPatientRepository();
    this.medicalAppointmentRepository = new MongoDBMedicalAppointmentRepository();

    // ============ CONFIGURACIÓN DE CONTROLADORES ============
    // Los controladores reciben los repositorios inyectados

    this.patientsController = new PatientsController(this.patientRepository);

    this.medicalAppointmentsController = new MedicalAppointmentsController(
      this.medicalAppointmentRepository
    );
  }

  /**
   * Obtiene la instancia única del container (Singleton)
   */
  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }

    return DependencyContainer.instance;
  }

  /**
   * Reinicia el container (útil para testing)
   */
  public static reset(): void {
    DependencyContainer.instance = null as any;
  }
}

// Exportar la instancia del container
export const container = DependencyContainer.getInstance();
