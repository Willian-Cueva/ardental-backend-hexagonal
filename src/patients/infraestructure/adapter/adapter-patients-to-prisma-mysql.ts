import { MedicalAppointment } from "../../domain/medical-appointment";
import { MedicalAppointmentMysqlType } from "../rest-api/types/medical-appointment-mysql-type";
import { MedicalAppointmentType } from "../../domain/types/medical-appointment-type";
import { MedicalAppointmentStateType } from "../../domain/types/medical-appointment-state-type";
import { MedicalAppointmentBody } from "../rest-api/types/medical-appointment-body";

export class AdapterPatientsToPrismaMySQL {

  static appointmentBodyToMedicalAppointment(appointmentBody: MedicalAppointmentBody): MedicalAppointment {
    const medicalAppointmentType: MedicalAppointmentType = {
      dniPatient: appointmentBody.medicalAppointment.dniPatient,
      namesPatient: appointmentBody.medicalAppointment.namesPatient,
      date: {
        day: appointmentBody.medicalAppointment.date.day,
        month: appointmentBody.medicalAppointment.date.month,
        year: appointmentBody.medicalAppointment.date.year,
      },
      timeStart: appointmentBody.medicalAppointment.timeStart,
      observations: appointmentBody.medicalAppointment.observations,
      state: appointmentBody.medicalAppointment.state,
    }
    return new MedicalAppointment(medicalAppointmentType);
  }
  static appointmentPrismaToMedicalAppointments(
    appointments: MedicalAppointmentMysqlType[]
  ): MedicalAppointment[] {
    return appointments.map((appointment) => {
      const medicalAppointmentStateType: MedicalAppointmentStateType =
        appointment.state === "PENDIENTE" ||
        appointment.state === "NO SE PRESENTO" ||
        appointment.state === "SE PRESENTO"
          ? appointment.state
          : "SE PRESENTO";
      const medicalAppointmentType: MedicalAppointmentType = {
        dniPatient: appointment.dniPatient,
        namesPatient: appointment.namesPatient,
        date: {
          day: appointment.day.toString(),
          month: appointment.month.toString(),
          year: appointment.year.toString(),
        },
        timeStart: appointment.timeStart,
        observations: appointment.observations,
        state: medicalAppointmentStateType,
      };
      return new MedicalAppointment(medicalAppointmentType);
    });
  }

  static appointmentToAppointmentTypeList(appointments: MedicalAppointment[]): MedicalAppointmentType[] {
    const medicalAppointmentTypeList: MedicalAppointmentType[] = [];
    appointments.forEach((appointment) => {
      medicalAppointmentTypeList.push(appointment.getMedicalAppointmentType());
    });
    return medicalAppointmentTypeList;
  }
}
