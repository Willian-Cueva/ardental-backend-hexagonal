import { MedicalAppointment } from '../../domain/entities/medical-appointment.entity';
import { DNI } from '../../domain/value-objects/dni';
import { Name } from '../../domain/value-objects/name';
import { AppointmentDate } from '../../domain/value-objects/appointment-date';
import { AppointmentTime } from '../../domain/value-objects/appointment-time';
import { AppointmentState } from '../../domain/value-objects/appointment-state';
import { IMedicalAppointment } from '../../../core/config/database/models/patient/medical-appointment';

/**
 * Mapper: MedicalAppointmentMapper
 *
 * Responsabilidad ÚNICA: Transformar datos entre MongoDB y Dominio.
 * NO contiene lógica de negocio ni validación (eso es responsabilidad del dominio).
 */
export class MedicalAppointmentMapper {
  /**
   * Convierte un documento de MongoDB a una entidad de dominio
   */
  static toDomain(persistenceModel: IMedicalAppointment): MedicalAppointment {
    const id = persistenceModel._id?.toString();

    if (!id) {
      throw new Error('No se puede mapear una cita médica sin ID desde la base de datos');
    }

    return MedicalAppointment.reconstruct({
      id,
      dniPatient: DNI.create(persistenceModel.dniPatient),
      namesPatient: Name.create(persistenceModel.namesPatient),
      date: AppointmentDate.create(
        persistenceModel.date.day,
        persistenceModel.date.month,
        persistenceModel.date.year
      ),
      timeStart: AppointmentTime.create(persistenceModel.timeStart),
      observations: persistenceModel.observations || '',
      state: AppointmentState.create(persistenceModel.state),
    });
  }

  /**
   * Convierte una entidad de dominio a un documento de MongoDB
   */
  static toPersistence(domainEntity: MedicalAppointment): Partial<IMedicalAppointment> {
    const primitives = domainEntity.toPrimitives();

    return {
      dniPatient: primitives.dniPatient,
      namesPatient: primitives.namesPatient,
      date: {
        day: primitives.date.day,
        month: primitives.date.month,
        year: primitives.date.year,
      },
      timeStart: primitives.timeStart,
      observations: primitives.observations,
      state: primitives.state,
    };
  }

  /**
   * Convierte múltiples documentos de MongoDB a entidades de dominio
   */
  static toDomainList(persistenceModels: IMedicalAppointment[]): MedicalAppointment[] {
    return persistenceModels.map((model) => this.toDomain(model));
  }
}
