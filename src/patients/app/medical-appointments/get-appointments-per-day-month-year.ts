import { MedicalAppointment } from "@/patients/domain/medical-appointment";
import { GetAllMedicalAppointments } from "./get-all-medical-appointments";

export class GetAppointmentsPerDayMonthYear {
  private readonly day: number;
  private readonly month: number;
  private readonly year: number;
  private readonly allAppointments: MedicalAppointment[];

  constructor(
    allAppointments: MedicalAppointment[],
    year: number,
    month: number,
    day: number
  ) {
    this.allAppointments = allAppointments;
    this.day = day;
    this.month = month;
    this.year = year;
  }

  async run(): Promise<MedicalAppointment[]> {
    const getAllAppointments = new GetAllMedicalAppointments(
      this.allAppointments
    );
    const listFillterAppointments = await getAllAppointments.run();
    return listFillterAppointments.filter(
      (appointment) =>
        appointment.getDay() === this.day &&
        appointment.getMonth() === this.month &&
        appointment.getYear() === this.year
    );
  }
}
