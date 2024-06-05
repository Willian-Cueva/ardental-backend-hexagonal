import { CalendarType } from "@/patients/domain/types/calendar-type";
import { GetAppointmentsPerMonthAndYear } from "./get-appointments-per-month-and-year";
import { GetAllMedicalAppointments } from "./get-all-medical-appointments";
import { MedicalAppointment } from "@/patients/domain/medical-appointment";
import { ListDayMonth } from "@/patients/domain/types/list-day-month";

export class GetCalendarWithAppointments {
  private readonly year: number;
  private readonly month: number;
  private readonly allAppointments: MedicalAppointment[];
  constructor(
    year: number,
    month: number,
    allAppointments: MedicalAppointment[]
  ) {
    this.year = year;
    this.month = month;
    this.allAppointments = allAppointments;
  }

  async run(): Promise<CalendarType> {
    const firstDayMonth = new Date(this.year, this.month, 1).getDay();
    const getAllAppointmentsPerMonthAndYear =
      new GetAppointmentsPerMonthAndYear(
        new GetAllMedicalAppointments(this.allAppointments),
        this.year,
        this.month
      );

    const daysMonth = new Date(this.year * 1, this.month * 1 + 1, 0).getDate();

    let listDaysMonth: ListDayMonth[] = [];
    for (let i = 1; i <= daysMonth; i++) {
      listDaysMonth.push({ day: i, appointments: 0 } as ListDayMonth);
    }

    const medicalAppointments = await getAllAppointmentsPerMonthAndYear.run();

    medicalAppointments.forEach((medicalAppointment) => {
      listDaysMonth[medicalAppointment.getDay() - 1].appointments++;
    });

    const calendar: CalendarType = {
      firstDayMonth: firstDayMonth,
      listDaysMonth: listDaysMonth,
    };
    return calendar;
  }
}
