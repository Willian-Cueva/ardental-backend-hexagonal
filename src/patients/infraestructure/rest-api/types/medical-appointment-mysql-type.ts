export type MedicalAppointmentMysqlType = {
  id: number;
  dniPatient: string;
  namesPatient: string;
  day:number;
  month: number;
  year: number;
  timeStart: string;
  observations: string;
  state: string;
}