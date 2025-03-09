import request from "supertest";
import express from "express";
import { MongoDBMedicalAppointmentRepository } from "../../patients/infraestructure/repositories/mongodb_medical_appointment_repository";
import { MedicalAppointment } from "../../patients/domain/medical-appointment";
import { medicalAppointmentsRouter } from "@/patients/infraestructure/rest-api/medical-appointments-router";

const app = express();
app.use(express.json());
app.use("/api", medicalAppointmentsRouter);

jest.mock("../../patients/infraestructure/repositories/mongodb_medical_appointment_repository");

describe("MedicalAppointmentsController Integration Tests", () => {
  let repository: MongoDBMedicalAppointmentRepository;

  beforeEach(() => {
    repository = new MongoDBMedicalAppointmentRepository();
    jest.clearAllMocks();
  });

  describe("GET /api/medical-appointment/:year/:month", () => {
    it("should return a list of medical appointments for the given month and year", async () => {
      const mockMedicalAppointments = [
        new MedicalAppointment({
          dniPatient: "1150579124",
          namesPatient: "Juan Perez",
          date: {
            day: "12",
            month: "5",
            year: "2024",
          },
          timeStart: "08:00",
          observations: "Paciente con fiebre",
          state: "PENDIENTE",
        }),
      ];

      (repository.findAll as jest.Mock).mockResolvedValue(mockMedicalAppointments);

      const response = await request(app).get("/medical-appointment/2024/5");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "ok",
        data: mockMedicalAppointments.map((appointment) => appointment.getMedicalAppointmentType()),
      });
    });

    it("should handle errors gracefully", async () => {
      (repository.findAll as jest.Mock).mockRejectedValue(new Error("Database connection failed"));

      const response = await request(app).get("/medical-appointment/2024/5");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Ocurrió un error al obtener las citas médicas por mes y año",
        data: expect.any(Object),
      });
    });
  });
});
