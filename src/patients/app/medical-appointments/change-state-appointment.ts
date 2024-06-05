import { MedicalAppointment } from "@/patients/domain/medical-appointment";
import { MedicalAppointmentStateType } from "@/patients/domain/types/medical-appointment-state-type";

export class ChangeStateAppointment {
  constructor(private medicalAppointment: MedicalAppointment, private state: MedicalAppointmentStateType) {}
  async run(): Promise<boolean> {
    if (!this.medicalAppointment) throw new Error("ClinicalSigns not found");
    this.medicalAppointment.setState(this.state);
    return true;
  }
}