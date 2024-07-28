// src/patients/infrastructure/adapter/adapter-medical-appointments-to-mongodb.ts

import { IMedicalAppointment } from "../../../core/config/database/models/patient/medical-appointment";
import { MedicalAppointment } from "../../domain/medical-appointment";
import { MedicalAppointmentType } from "../../domain/types/medical-appointment-type";

export class AdapterMedicalAppointmentsToMongoDB {
  static medicalAppointmentTypeToAppointmentModel(appointmentType: MedicalAppointmentType): IMedicalAppointment {
    return {
      dniPatient: appointmentType.dniPatient,
      namesPatient: appointmentType.namesPatient,
      date: {
        day: appointmentType.date.day,
        month: appointmentType.date.month,
        year: appointmentType.date.year,
      },
      timeStart: appointmentType.timeStart,
      observations: appointmentType.observations,
      state: appointmentType.state,
    } as IMedicalAppointment;
  }

  static appointmentModelToMedicalAppointmentType(appointment: IMedicalAppointment): MedicalAppointmentType {
    return {
      dniPatient: appointment.dniPatient,
      namesPatient: appointment.namesPatient,
      date: {
        day: appointment.date.day,
        month: appointment.date.month,
        year: appointment.date.year,
      },
      timeStart: appointment.timeStart,
      observations: appointment.observations,
      state: appointment.state,
    }as MedicalAppointmentType;
  }

  static appointmentsModelToMedicalAppointments(appointments: IMedicalAppointment[]): MedicalAppointment[] {
    return appointments.map((appointment) => {
      const appointmentType = this.appointmentModelToMedicalAppointmentType(appointment);
      return new MedicalAppointment(appointmentType);
    });
  }

  static medicalAppointmentsToAppointmentTypeList(appointments: MedicalAppointment[]): MedicalAppointmentType[] {
    return appointments.map((appointment) => appointment.getMedicalAppointmentType());
  }
}