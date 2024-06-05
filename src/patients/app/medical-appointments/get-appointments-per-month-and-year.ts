import { MedicalAppointment } from "@/patients/domain/medical-appointment";
import { GetAllMedicalAppointments } from "./get-all-medical-appointments";

export class GetAppointmentsPerMonthAndYear {
  private getAllAppointments: GetAllMedicalAppointments;
  private month: number;
  private year: number;

  constructor(
    getAllAppointments: GetAllMedicalAppointments,
    year: number,
    month: number
  ) {
    this.getAllAppointments = getAllAppointments;
    this.month = month;
    this.year = year;
  }
  async run(): Promise<MedicalAppointment[]> {
    const allAppointments = await this.getAllAppointments.run();
    const medicalAppointmentsPerMonth = allAppointments.filter(
      (appointment: MedicalAppointment) =>
        appointment.getMonth() === this.month &&
        appointment.getYear() === this.year
    );

    return medicalAppointmentsPerMonth;
  }
}
