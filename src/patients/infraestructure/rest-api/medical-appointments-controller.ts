// src/patients/infrastructure/rest-api/medical-appointments-controller.ts

import { Request, Response } from "express";
import { ResponseServerType } from "./types/response-server-type";
import { GetAllMedicalAppointments } from "../../app/medical-appointments/get-all-medical-appointments";
import { GetAppointmentsPerMonthAndYear } from "../../app/medical-appointments/get-appointments-per-month-and-year";
import { MedicalAppointmentType } from "../../domain/types/medical-appointment-type";
import { MongoDBMedicalAppointmentRepository } from "../repositories/mongodb_medical_appointment_repository";

class MedicalAppointmentsController {
  private medicalAppointmentRepository: MongoDBMedicalAppointmentRepository;

  constructor() {
    this.medicalAppointmentRepository = new MongoDBMedicalAppointmentRepository();
  }

  getAppointmentsPerMonthAndYear = async (req: Request, res: Response) => {
    try {
      const { year, month } = req.params;
      const getAllAppointments = new GetAllMedicalAppointments(this.medicalAppointmentRepository);
      const getAppointmentsPerMonthAndYear = new GetAppointmentsPerMonthAndYear(
        getAllAppointments,
        parseInt(year),
        parseInt(month)
      );
      const appointmentsLocal = await getAppointmentsPerMonthAndYear.run();

      const appointmentsResponse: MedicalAppointmentType[] = appointmentsLocal.map(
        appointment => appointment.getMedicalAppointmentType()
      );
      
      const response: ResponseServerType = {
        message: "ok",
        data: appointmentsResponse,
      };
      res.json(response);
    } catch (error) {
      const response: ResponseServerType = {
        message: "Ocurrió un error al obtener las citas médicas por mes y año",
        data: error,
      };
      res.json(response);
    }
  };
}

export const medicalAppointmentsController = new MedicalAppointmentsController();