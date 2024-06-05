import { MedicalAppointment } from "@/patients/domain/medical-appointment";

export class UpdateMedicalAppointment {
  constructor(private readonly medicalAppointment: MedicalAppointment) {}
  run() {
    return new Promise<void>((resolve, reject) => {
      const medicalAppointmentLocal = this.medicalAppointment.getMedicalAppointmentType();

      if (medicalAppointmentLocal===null) {
        throw new Error("MedicalAppointmentType not found");
      }

      this.medicalAppointment
        .update(medicalAppointmentLocal)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }
}