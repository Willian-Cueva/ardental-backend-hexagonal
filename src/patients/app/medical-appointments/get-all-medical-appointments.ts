import { MedicalAppointment } from "@/patients/domain/medical-appointment";

export class GetAllMedicalAppointments {
  private medicalAppointments: MedicalAppointment[];
  constructor(medicalAppointments: MedicalAppointment[]) {
    this.medicalAppointments = medicalAppointments;
  }
  async run(): Promise<MedicalAppointment[]> {
    return this.medicalAppointments
  }
}