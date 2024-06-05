import { MedicalAppointment } from "@/patients/domain/medical-appointment";

export class CreateMedicalAppointment {
  private readonly medicalAppointment: MedicalAppointment;
  constructor(medicalAppointment: MedicalAppointment) {
    this.medicalAppointment = medicalAppointment;
  }

  run(): Promise<MedicalAppointment> {
    this.medicalAppointment.create();
    return Promise.resolve(this.medicalAppointment);
  }
}
