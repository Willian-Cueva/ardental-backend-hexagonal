import { MedicalAppointmentRepository } from '../../domain/repositories/medical-appointment.repository';
import { MedicalAppointment } from '../../domain/entities/medical-appointment.entity';
import { DNI } from '../../domain/value-objects/dni';
import MedicalAppointmentModel from '../../../core/config/database/models/patient/medical-appointment';
import { MedicalAppointmentMapper } from '../mappers/medical-appointment.mapper';

/**
 * Adaptador: MongoDBMedicalAppointmentRepository
 *
 * Implementación CONCRETA del puerto MedicalAppointmentRepository usando MongoDB.
 * Esta clase pertenece a la INFRAESTRUCTURA.
 */
export class MongoDBMedicalAppointmentRepository implements MedicalAppointmentRepository {
  async save(appointment: MedicalAppointment): Promise<void> {
    const persistenceModel = MedicalAppointmentMapper.toPersistence(appointment);
    await MedicalAppointmentModel.create(persistenceModel);
  }

  async findById(id: string): Promise<MedicalAppointment | null> {
    const appointmentDoc = await MedicalAppointmentModel.findById(id);

    if (!appointmentDoc) {
      return null;
    }

    return MedicalAppointmentMapper.toDomain(appointmentDoc);
  }

  async findAll(): Promise<MedicalAppointment[]> {
    const appointments = await MedicalAppointmentModel.find();
    return MedicalAppointmentMapper.toDomainList(appointments);
  }

  async findByMonthAndYear(month: number, year: number): Promise<MedicalAppointment[]> {
    // Formatear con padding para coincidir con el formato almacenado
    const monthStr = month.toString().padStart(2, '0');
    const yearStr = year.toString();

    const appointments = await MedicalAppointmentModel.find({
      'date.month': monthStr,
      'date.year': yearStr,
    });

    return MedicalAppointmentMapper.toDomainList(appointments);
  }

  async findByPatientDNI(dni: DNI): Promise<MedicalAppointment[]> {
    const appointments = await MedicalAppointmentModel.find({
      dniPatient: dni.getValue(),
    });

    return MedicalAppointmentMapper.toDomainList(appointments);
  }

  async update(appointment: MedicalAppointment): Promise<void> {
    const id = appointment.getId();

    if (!id) {
      throw new Error('No se puede actualizar una cita sin ID');
    }

    const persistenceModel = MedicalAppointmentMapper.toPersistence(appointment);
    await MedicalAppointmentModel.findByIdAndUpdate(id, persistenceModel);
  }

  async delete(id: string): Promise<void> {
    await MedicalAppointmentModel.findByIdAndDelete(id);
  }
}
