import { MedicalAppointment } from "../../domain/medical-appointment";
import { IRepository } from "../../domain/repositories/irepository";

export class GetAllMedicalAppointments {
  constructor(private medicalAppointmentRepository: IRepository<MedicalAppointment>) {}

  async run(): Promise<MedicalAppointment[]> {
    return await this.medicalAppointmentRepository.findAll();
  }
}