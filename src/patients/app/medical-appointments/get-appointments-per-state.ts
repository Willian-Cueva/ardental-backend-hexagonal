import { MedicalAppointment } from "@/patients/domain/medical-appointment";
import { MedicalAppointmentStateType } from "@/patients/domain/types/medical-appointment-state-type";
import { GetAllMedicalAppointments } from "./get-all-medical-appointments";

export class GetAppointmentsPerState {
  private state: MedicalAppointmentStateType;
  private allMedicalAppointments: MedicalAppointment[];
  constructor(state: MedicalAppointmentStateType,allMedicalAppointments: MedicalAppointment[]) {
    this.state = state;
    this.allMedicalAppointments = allMedicalAppointments;
  }

  async run(): Promise<MedicalAppointment[]> {
    const getAllAppointments = new GetAllMedicalAppointments(this.allMedicalAppointments);
    const medicalAppointments = await getAllAppointments.run();
    return medicalAppointments.filter((appointment) => appointment.getState() === this.state);
  }
}