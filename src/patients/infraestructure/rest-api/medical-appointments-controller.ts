import { MedicalAppointment } from "../../domain/medical-appointment";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateMedicalAppointment } from "../../app/medical-appointments/create-medical-appointment";
import { ResponseServerType } from "../../../users/infraestructure/rest-api/types/response-server-type";
import { GetAllMedicalAppointments } from "../../app/medical-appointments/get-all-medical-appointments";
import { MedicalAppointmentMysqlType } from "./types/medical-appointment-mysql-type";
import { AdapterPatientsToPrismaMySQL } from "../adapter/adapter-patients-to-prisma-mysql";
import { GetAppointmentsPerDayMonthYear } from "../../app/medical-appointments/get-appointments-per-day-month-year";
import { CalendarType } from "../../domain/types/calendar-type";
import { GetCalendarWithAppointments } from "../../app/medical-appointments/get-calendar-with-appointments";
import { MedicalAppointmentBody } from "./types/medical-appointment-body";
import { GetAppointmentsPerMonthAndYear } from "../../app/medical-appointments/get-appointments-per-month-and-year";
import { MedicalAppointmentType } from "../../domain/types/medical-appointment-type";

class MedicalAppointmentsController {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  createMedicalAppointment = async (req: Request, res: Response) => {
    try {
      const medicalAppointmentBody: MedicalAppointmentBody = req.body;

      const medicalAppointment: MedicalAppointment =
        AdapterPatientsToPrismaMySQL.appointmentBodyToMedicalAppointment(
          medicalAppointmentBody
        );

      const createMedicalAppointment = new CreateMedicalAppointment(
        medicalAppointment
      );

      await createMedicalAppointment.run();
      const medicalAppointmentLocal =
        medicalAppointment.getMedicalAppointmentType();
      if (!medicalAppointmentLocal)
        throw new Error("MedicalAppointmentType not found");
      await this.prisma.medicalAppointment.create({
        data: {
          dniPatient: medicalAppointmentLocal.dniPatient,
          namesPatient: medicalAppointmentLocal.namesPatient,
          day: parseInt(medicalAppointmentLocal.date.day),
          month: parseInt(medicalAppointmentLocal.date.month),
          year: parseInt(medicalAppointmentLocal.date.year),
          timeStart: medicalAppointmentLocal.timeStart,
          observations: medicalAppointmentLocal.observations,
          state: medicalAppointmentLocal.state,
        },
      });
      const response: ResponseServerType = {
        status: "ok",
        data: null,
      };
      res.json(response);
    } catch (error) {
      const response: ResponseServerType = {
        status: "Ocurrió un error al crear una cita medica",
        data: error,
      };
      res.json(response);
    }
  };

  getCalendar = async (req: Request, res: Response) => {
    try {
      const { year, month } = req.params;
      const appointments: MedicalAppointmentMysqlType[] =
        await this.prisma.medicalAppointment.findMany();
      const allAppointments: MedicalAppointment[] =
        AdapterPatientsToPrismaMySQL.appointmentPrismaToMedicalAppointments(
          appointments
        );
      const getAllAppointments = new GetAllMedicalAppointments(allAppointments);
      const appointmentsLocal = await getAllAppointments.run();
      const getCalendar = new GetCalendarWithAppointments(
        parseInt(year),
        parseInt(month),
        appointmentsLocal
      );
      const calendar: CalendarType = await getCalendar.run();
      const response: ResponseServerType = {
        status: "ok",
        data: calendar,
      };
      res.json(response);
    } catch (error) {
      console.log(error);
      const response: ResponseServerType = {
        status: "Ocurió un error al obtener las citas medicas por mes",
        data: error,
      };
      res.json(response);
    }
  };

  getAppointmentsPerDayMonthYear = async (req: Request, res: Response) => {
    try {
      const { year, month, day } = req.params;
      const appointments: MedicalAppointmentMysqlType[] =
        await this.prisma.medicalAppointment.findMany();
      const allAppointments: MedicalAppointment[] =
        AdapterPatientsToPrismaMySQL.appointmentPrismaToMedicalAppointments(
          appointments
        );
      const getAppointmentsPerDayMonthYear = new GetAppointmentsPerDayMonthYear(
        allAppointments,
        parseInt(year),
        parseInt(month),
        parseInt(day)
      );
      const appointmentsLocal = await getAppointmentsPerDayMonthYear.run();
      console.log(`Tamaño de la lista de citas: ${appointmentsLocal.length}`);

      const appointmentsResponse: MedicalAppointmentType[] =
        AdapterPatientsToPrismaMySQL.appointmentToAppointmentTypeList(
          appointmentsLocal
        );
      const response: ResponseServerType = {
        status: "ok",
        data: appointmentsResponse,
      };
      res.json(response);
    } catch (error) {
      const response: ResponseServerType = {
        status: "Ocurió un error al obtener las citas medicas por fecha",
        data: error,
      };
      res.json(response);
    }
  };

  getAppointmentsPerMonthAndYear = async (req: Request, res: Response) => {
    try {
      const { year, month } = req.params;
      const appointments: MedicalAppointmentMysqlType[] =
        await this.prisma.medicalAppointment.findMany();
      const allAppointments: MedicalAppointment[] =
        AdapterPatientsToPrismaMySQL.appointmentPrismaToMedicalAppointments(
          appointments
        );
      const getAllAppointments = new GetAllMedicalAppointments(allAppointments);
      const getAppointmentsPerMonthAndYear = new GetAppointmentsPerMonthAndYear(
        getAllAppointments,
        parseInt(year),
        parseInt(month)
      );
      const appointmentsLocal = await getAppointmentsPerMonthAndYear.run();

      const appointmentsResponse: MedicalAppointmentType[] =
        AdapterPatientsToPrismaMySQL.appointmentToAppointmentTypeList(
          appointmentsLocal
        );
      const response: ResponseServerType = {
        status: "ok",
        data: appointmentsResponse,
      };
      res.json(response);
    } catch (error) {
      const response: ResponseServerType = {
        status: "Ocurió un error al obtener las citas medicas por mes y anio",
        data: error,
      };
      res.json(response);
    }
  };
}

export const medicalAppointmentsController =
  new MedicalAppointmentsController();
