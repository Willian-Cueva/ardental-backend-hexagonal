import { PatientRepository } from '../../domain/repositories/patient.repository';
import { Patient } from '../../domain/entities/patient.entity';
import { DNI } from '../../domain/value-objects/dni';
import PatientModel from '../../../core/config/database/models/patient/patient';
import { PatientMapper } from '../mappers/patient.mapper';

/**
 * Adaptador: MongoDBPatientRepository
 *
 * Implementación CONCRETA del puerto PatientRepository usando MongoDB.
 * Esta clase pertenece a la INFRAESTRUCTURA.
 *
 * Responsabilidades:
 * - Interactuar con MongoDB a través de Mongoose
 * - Usar PatientMapper para transformar entre dominio y persistencia
 * - Manejar errores de persistencia
 *
 * En arquitectura hexagonal:
 * - Implementa un PUERTO del dominio
 * - Es un ADAPTADOR de salida (driving adapter)
 * - El dominio NO conoce esta implementación
 */
export class MongoDBPatientRepository implements PatientRepository {
  async save(patient: Patient): Promise<void> {
    const persistenceModel = PatientMapper.toPersistence(patient);
    await PatientModel.create(persistenceModel);
  }

  async findById(id: string): Promise<Patient | null> {
    const patientDoc = await PatientModel.findById(id);

    if (!patientDoc) {
      return null;
    }

    return PatientMapper.toDomain(patientDoc);
  }

  async findByDNI(dni: DNI): Promise<Patient | null> {
    const patientDoc = await PatientModel.findOne({ dni: dni.getValue() });

    if (!patientDoc) {
      return null;
    }

    return PatientMapper.toDomain(patientDoc);
  }

  async findAll(): Promise<Patient[]> {
    const patients = await PatientModel.find();
    return PatientMapper.toDomainList(patients);
  }

  async update(patient: Patient): Promise<void> {
    const id = patient.getId();

    if (!id) {
      throw new Error('No se puede actualizar un paciente sin ID');
    }

    const persistenceModel = PatientMapper.toPersistence(patient);
    await PatientModel.findByIdAndUpdate(id, persistenceModel);
  }

  async delete(id: string): Promise<void> {
    await PatientModel.findByIdAndDelete(id);
  }

  async existsByDNI(dni: DNI): Promise<boolean> {
    const count = await PatientModel.countDocuments({ dni: dni.getValue() });
    return count > 0;
  }
}
