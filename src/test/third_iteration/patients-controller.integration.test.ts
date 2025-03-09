import request from "supertest";
import express from "express";
import { patientsRouter } from "../../patients/infraestructure/rest-api/patients-router";
import { MongoDBPatientRepository } from "../../patients/infraestructure/repositories/mongodb_patient_repository";
import { Patient } from "../../patients/domain/patient";

const app = express();
app.use(express.json());
app.use("/api", patientsRouter);

jest.mock("../../patients/infraestructure/repositories/mongodb_patient_repository");

describe("PatientsController Integration Tests", () => {
  let repository: MongoDBPatientRepository;

  beforeEach(() => {
    repository = new MongoDBPatientRepository();
    jest.clearAllMocks();
  });

  describe("GET /api/all-patients", () => {
    it("should return a list of all patients", async () => {
      const mockPatients = [
        new Patient({
          names: "John Doe",
          profession: "Engineer",
          dni: "1234567890",
          phone: "0987654321",
          dateBorn: "1990-01-01",
          direction: "123 Main St",
          maritalStatus: "Soltero/a",
          sex: "Masculino",
          reason: "Checkup",
          version: 1,
        }),
      ];

      (repository.findAll as jest.Mock).mockResolvedValue(mockPatients);

      const response = await request(app).get("/api/all-patients");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Petición obtener pacientes satisfactoria",
        data: mockPatients.map((patient) => patient.getPatientType()),
      });
    });

    it("should handle errors gracefully", async () => {
      (repository.findAll as jest.Mock).mockRejectedValue(new Error("Database connection failed"));

      const response = await request(app).get("/api/all-patients");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Error al obtener los pacientes debido a: Error: Database connection failed",
        data: null,
      });
    });
  });
});
