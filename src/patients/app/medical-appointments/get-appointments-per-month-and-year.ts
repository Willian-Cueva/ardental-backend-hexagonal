// src/patients/app/medical-appointments/get-appointments-per-month-and-year.ts

import { MedicalAppointment } from "../../domain/medical-appointment";
import { GetAllMedicalAppointments } from "./get-all-medical-appointments";

export class GetAppointmentsPerMonthAndYear {
  constructor(
    private getAllAppointments: GetAllMedicalAppointments,
    private year: number,
    private month: number
  ) {}

  async run(): Promise<MedicalAppointment[]> {
    const allAppointments = await this.getAllAppointments.run();
    return allAppointments.filter(
      (appointment: MedicalAppointment) =>
        appointment.getMonth() === this.month &&
        appointment.getYear() === this.year
    );
  }
}