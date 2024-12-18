import { MongoDBPatientRepository } from "../../patients/infraestructure/repositories/mongodb_patient_repository";
import PatientModel, { IPatient } from "../../core/config/database/models/patient/patient";
import { AdapterPatientsToMongoDB } from "../../patients/infraestructure/adapter/adapter-patients-to-mongodb";
import { Patient } from "../../patients/domain/patient";
import { PatientType } from "@/patients/domain/types/patient-type";

jest.mock("../../core/config/database/models/patient/patient");
jest.mock("../../patients/infraestructure/adapter/adapter-patients-to-mongodb");

describe("MongoDBPatientRepository", () => {
  let repository: MongoDBPatientRepository;

  beforeEach(() => {
    repository = new MongoDBPatientRepository();
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return a list of patients", async () => {
      const mockPatients: IPatient[] = [
        {
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
          createdAt: new Date(),
          updatedAt: new Date(),
        } as IPatient,
      ];

      (PatientModel.find as jest.Mock).mockResolvedValue(mockPatients);
      (AdapterPatientsToMongoDB.patientsModelToPatients as jest.Mock).mockReturnValue(
        mockPatients.map((patient) => new Patient(patient as PatientType))
      );

      const result = await repository.findAll();
      expect(PatientModel.find).toHaveBeenCalledTimes(1);
      expect(AdapterPatientsToMongoDB.patientsModelToPatients).toHaveBeenCalledWith(mockPatients);
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Patient);
    });
  });

  describe("findById", () => {
    it("should return a patient by ID", async () => {
      const mockPatient: IPatient = {
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
        createdAt: new Date(),
        updatedAt: new Date(),
      } as IPatient;

      (PatientModel.findById as jest.Mock).mockResolvedValue(mockPatient);
      (AdapterPatientsToMongoDB.patientModelToPatientType as jest.Mock).mockReturnValue(mockPatient);

      const result = await repository.findById("mock-id");
      expect(PatientModel.findById).toHaveBeenCalledWith("mock-id");
      expect(result).toBeInstanceOf(Patient);
    });

    it("should return null if patient not found", async () => {
      (PatientModel.findById as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById("mock-id");
      expect(PatientModel.findById).toHaveBeenCalledWith("mock-id");
      expect(result).toBeNull();
    });
  });

  describe("save", () => {
    it("should save a new patient", async () => {
      const mockPatient = new Patient({
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
      });

      const mockPatientModel = {
        ...mockPatient.getPatientType(),
      };

      (AdapterPatientsToMongoDB.patientTypeToPatientModel as jest.Mock).mockReturnValue(mockPatientModel);
      (PatientModel.create as jest.Mock).mockResolvedValue(mockPatientModel);

      await repository.save(mockPatient);
      expect(AdapterPatientsToMongoDB.patientTypeToPatientModel).toHaveBeenCalledWith(mockPatient.getPatientType());
      expect(PatientModel.create).toHaveBeenCalledWith(mockPatientModel);
    });
  });

  describe("update", () => {
    it("should update an existing patient", async () => {
      const mockPatient = new Patient({
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
      });

      const mockPatientModel = {
        ...mockPatient.getPatientType(),
      };

      (AdapterPatientsToMongoDB.patientTypeToPatientModel as jest.Mock).mockReturnValue(mockPatientModel);

      await repository.update("mock-id", mockPatient);
      expect(AdapterPatientsToMongoDB.patientTypeToPatientModel).toHaveBeenCalledWith(mockPatient.getPatientType());
      expect(PatientModel.findByIdAndUpdate).toHaveBeenCalledWith("mock-id", mockPatientModel);
    });
  });

  describe("delete", () => {
    it("should delete a patient by ID", async () => {
      (PatientModel.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

      await repository.delete("mock-id");
      expect(PatientModel.findByIdAndDelete).toHaveBeenCalledWith("mock-id");
    });
  });
});
