import { Patient } from '../../domain/entities/patient.entity';
import { DNI } from '../../domain/value-objects/dni';
import { Name } from '../../domain/value-objects/name';
import { Phone } from '../../domain/value-objects/phone';
import { DateOfBirth } from '../../domain/value-objects/date-of-birth';
import { MaritalStatus } from '../../domain/value-objects/marital-status';
import { Sex } from '../../domain/value-objects/sex';
import { IPatient } from '../../../core/config/database/models/patient/patient';

/**
 * Mapper: PatientMapper
 *
 * Responsabilidad ÚNICA: Transformar datos entre MongoDB y Dominio.
 * NO contiene lógica de negocio ni validación (eso es responsabilidad del dominio).
 *
 * En arquitectura hexagonal, este es un ADAPTADOR que traduce entre
 * el puerto (repositorio) y el sistema externo (MongoDB).
 */
export class PatientMapper {
  /**
   * Convierte un documento de MongoDB a una entidad de dominio
   * Usa fromPersistence() en lugar de create() para reconstruir datos de la BD
   */
  static toDomain(persistenceModel: IPatient): Patient {
    const id = persistenceModel._id?.toString();

    if (!id) {
      throw new Error('No se puede mapear un paciente sin ID desde la base de datos');
    }

    return Patient.reconstruct({
      id,
      names: Name.fromPersistence(persistenceModel.names),
      profession: persistenceModel.profession || '',  // Valor por defecto para datos legacy
      dni: DNI.fromPersistence(persistenceModel.dni),
      phone: Phone.fromPersistence(persistenceModel.phone),
      dateBorn: DateOfBirth.fromPersistence(persistenceModel.dateBorn),
      direction: persistenceModel.direction || '',    // Valor por defecto para datos legacy
      maritalStatus: MaritalStatus.fromPersistence(persistenceModel.maritalStatus),
      sex: Sex.fromPersistence(persistenceModel.sex),
      reason: persistenceModel.reason || '',          // Valor por defecto para datos legacy
      __v: (persistenceModel as any).__v ?? 0,        // Mongoose version key
      createdAt: persistenceModel.createdAt,          // Mongoose timestamp
    });
  }

  /**
   * Convierte una entidad de dominio a un documento de MongoDB
   */
  static toPersistence(domainEntity: Patient): Partial<IPatient> {
    const primitives = domainEntity.toPrimitives();

    return {
      names: primitives.names,
      profession: primitives.profession,
      dni: primitives.dni,
      phone: primitives.phone,
      dateBorn: primitives.dateBorn,
      direction: primitives.direction,
      maritalStatus: primitives.maritalStatus,
      sex: primitives.sex,
      reason: primitives.reason,
      version: 2,
    };
  }

  /**
   * Convierte múltiples documentos de MongoDB a entidades de dominio
   */
  static toDomainList(persistenceModels: IPatient[]): Patient[] {
    return persistenceModels.map((model) => this.toDomain(model));
  }
}
