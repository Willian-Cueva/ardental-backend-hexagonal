import { medicalAppointmentsController } from "../../patients/infraestructure/rest-api/medical-appointments-controller";
import { Request, Response } from "express";
import { GetAllMedicalAppointments } from "../../patients/app/medical-appointments/get-all-medical-appointments";
import { MedicalAppointment } from "../../patients/domain/medical-appointment";

jest.mock(
  "../../patients/app/medical-appointments/get-all-medical-appointments"
);

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
            month: "3",
            year: "2021",
          },
          timeStart: "08:00",
          observations: "Paciente con fiebre",
          state: "PENDIENTE",
        }),
      ];

      (GetAllMedicalAppointments.prototype.run as jest.Mock).mockResolvedValue(
        mockMedicalAppointments
      );

      await medicalAppointmentsController.allMedicalAppointments(
        req as Request,
        res as Response
      );

      expect(GetAllMedicalAppointments.prototype.run).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "ok",
        data: mockMedicalAppointments.map((medicalAppointment) =>
          medicalAppointment.getMedicalAppointmentType()
        ),
      });
    });

    it("should handle errors gracefully", async () => {
      const mockError = new Error("Database connection failed");

      (GetAllMedicalAppointments.prototype.run as jest.Mock).mockRejectedValue(
        mockError
      );

      await medicalAppointmentsController.allMedicalAppointments(
        req as Request,
        res as Response
      );

      expect(GetAllMedicalAppointments.prototype.run).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Ocurrió un error al obtener las citas médicas",
        data: mockError,
      });
    });
  });
});
