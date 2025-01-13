import { medicalAppointmentsController } from "../../patients/infraestructure/rest-api/medical-appointments-controller";
import { Request, Response } from "express";
import { GetAllMedicalAppointments } from "../../patients/app/medical-appointments/get-all-medical-appointments";
import { MedicalAppointment } from "../../patients/domain/medical-appointment";

jest.mock("../../patients/app/medical-appointments/get-all-medical-appointments");

describe("MedicalAppointmentsController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("allMedicalAppointments", () => {
    it("should return a list of medical appointments on successful request", async () => {
      const mockMedicalAppointments = [
        new MedicalAppointment({
          dniPatient: "1150579124",
          namesPatient: "Juan Perez",
          date: {
            day: "12",
            month: "01",
            year: "2021",
          },
          timeStart: "08:00",
          observations: "Paciente con fiebre",
          state: "PENDIENTE",
        }),
      ];

      (GetAllMedicalAppointments.prototype.run as jest.Mock).mockResolvedValue(mockMedicalAppointments);

      await medicalAppointmentsController.getAppointmentsPerMonthAndYear(req as Request, res as Response);

      expect(GetAllMedicalAppointments.prototype.run).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Petición obtener citas médicas satisfactoria",
        data: mockMedicalAppointments.map((medicalAppointment) => medicalAppointment.getMedicalAppointmentType()),
      });
    });

    it("should handle errors gracefully", async () => {
      const mockError = new Error("Database connection failed");

      (GetAllMedicalAppointments.prototype.run as jest.Mock).mockRejectedValue(mockError);

      await medicalAppointmentsController.getAppointmentsPerMonthAndYear(req as Request, res as Response);

      expect(GetAllMedicalAppointments.prototype.run).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Ocurrió un error al obtener las citas médicas por mes y año",
        data: null,
      });
    });
  });

  describe("getAppointmentsPerMonthAndYear", () => {
    it("debería retornar una lista de citas médicas por mes y año en una solicitud exitosa", async () => {
      req.params = { year: "2021", month: "1" };
      const mockMedicalAppointments = [
        new MedicalAppointment({
          dniPatient: "1150579124",
          namesPatient: "Juan Perez",
          date: {
            day: "01",
            month: "0chr1",
            year: "2021",
          },
          timeStart: "08:00",
          observations: "Paciente con fiebre",
          state: "PENDIENTE",
        }),
      ];

      (GetAllMedicalAppointments.prototype.run as jest.Mock).mockResolvedValue(mockMedicalAppointments);

      await medicalAppointmentsController.getAppointmentsPerMonthAndYear(req as Request, res as Response);

      expect(GetAllMedicalAppointments.prototype.run).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "ok",
        data: mockMedicalAppointments.map((medicalAppointment) => medicalAppointment.getMedicalAppointmentType()),
      });
    });

    it("debería manejar errores de manera adecuada", async () => {
      req.params = { year: "2021", month: "1" };
      const mockError = new Error("Database connection failed");

      (GetAllMedicalAppointments.prototype.run as jest.Mock).mockRejectedValue(mockError);

      await medicalAppointmentsController.getAppointmentsPerMonthAndYear(req as Request, res as Response);

      expect(GetAllMedicalAppointments.prototype.run).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Ocurrió un error al obtener las citas médicas por mes y año",
        data: mockError,
      });
    });
  });
});