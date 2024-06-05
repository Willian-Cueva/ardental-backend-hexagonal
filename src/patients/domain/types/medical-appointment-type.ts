import { MedicalAppointmentStateType } from "./medical-appointment-state-type";

export type MedicalAppointmentType = {
  dniPatient: string;
  namesPatient: string;
  date:{
    day: string,
    month: string,
    year: string,
  };
  timeStart: string;
  observations: string;
  state: MedicalAppointmentStateType;
}