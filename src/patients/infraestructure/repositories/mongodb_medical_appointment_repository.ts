import { MedicalAppointment } from "../../domain/medical-appointment";
import MedicalAppointmentModel, { IMedicalAppointment } from "../../../core/config/database/models/patient/medical-appointment";
import { AdapterMedicalAppointmentsToMongoDB } from "../adapter/adapter-medical-appointment-to-mongodb"
import { IRepository } from "../../domain/repositories/irepository";	

export class MongoDBMedicalAppointmentRepository implements IRepository<MedicalAppointment> {
  async findAll(): Promise<MedicalAppointment[]> {
    const appointments: IMedicalAppointment[] = await MedicalAppointmentModel.find();
    return AdapterMedicalAppointmentsToMongoDB.appointmentsModelToMedicalAppointments(appointments);
  }

  async findById(id: string): Promise<MedicalAppointment | null> {
    const appointment = await MedicalAppointmentModel.findById(id);
    if (!appointment) return null;
    return new MedicalAppointment(AdapterMedicalAppointmentsToMongoDB.appointmentModelToMedicalAppointmentType(appointment));
  }

  async save(appointment: MedicalAppointment): Promise<void> {
    const appointmentModel = AdapterMedicalAppointmentsToMongoDB.medicalAppointmentTypeToAppointmentModel(appointment.getMedicalAppointmentType());
    await MedicalAppointmentModel.create(appointmentModel);
  }

  async update(id: string, appointment: MedicalAppointment): Promise<void> {
    const appointmentModel = AdapterMedicalAppointmentsToMongoDB.medicalAppointmentTypeToAppointmentModel(appointment.getMedicalAppointmentType());
    await MedicalAppointmentModel.findByIdAndUpdate(id, appointmentModel);
  }

  async delete(id: string): Promise<void> {
    await MedicalAppointmentModel.findByIdAndDelete(id);
  }
}