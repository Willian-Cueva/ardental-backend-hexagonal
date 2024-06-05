import { MedicalAppointment } from "@/patients/domain/medical-appointment";

export class DeleteMedicalAppointment {
  private medicalAppointment: MedicalAppointment
    constructor(medicalAppointment: MedicalAppointment) {
      this.medicalAppointment = medicalAppointment
    }
    async run(): Promise<boolean> {
      if (!this.medicalAppointment) throw new Error("ClinicalSigns not found");
      return this.medicalAppointment.delete();
    }
}