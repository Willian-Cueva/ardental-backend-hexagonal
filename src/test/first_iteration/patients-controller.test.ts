import { patientsController } from "../../patients/infraestructure/rest-api/patients-controller";
import { Request, Response } from "express";
import { GetAllPatients } from "../../patients/app/patients/get-all-patients";
import { Patient } from "../../patients/domain/patient";

jest.mock("../../patients/app/patients/get-all-patients");

describe("PatientsController", () => {
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

  describe("allPatients", () => {
    it("should return a list of patients on successful request", async () => {
      const mockPatients = [
        new Patient({
          names: "John Doe",
          profession: "Engineer",
          dni: "1150579124",
          phone: "0987654321",
          dateBorn: "1990-01-01",
          direction: "123 Main St",
          maritalStatus: "Soltero/a",
          sex: "Masculino",
          reason: "Checkup",
          version: 1,
        }),
      ];

      (GetAllPatients.prototype.run as jest.Mock).mockResolvedValue(mockPatients);

      await patientsController.allPatients(req as Request, res as Response);

      expect(GetAllPatients.prototype.run).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Petición obtener pacientes satisfactoria",
        data: mockPatients.map((patient) => patient.getPatientType()),
      });
    });

    it("should handle errors gracefully", async () => {
      const mockError = new Error("Database connection failed");

      (GetAllPatients.prototype.run as jest.Mock).mockRejectedValue(mockError);

      await patientsController.allPatients(req as Request, res as Response);

      expect(GetAllPatients.prototype.run).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: `Error al obtener los pacientes debido a: Error: Database connection failed`,
        data: null,
      });
    });
  });
});
