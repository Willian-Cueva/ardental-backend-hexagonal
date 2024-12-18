import { AdapterPatientsToMongoDB } from "../../patients/infraestructure/adapter/adapter-patients-to-mongodb";
import { IPatient } from "@/core/config/database/models/patient/patient";
import { Patient } from "../../patients/domain/patient";
import { PatientType } from "../../patients/domain/types/patient-type";

describe("AdapterPatientsToMongoDB", () => {
  describe("patientModelToPatientType", () => {
    it("debería convertir IPatient ashould convert IPatient to PatientType", () => {
      const patient = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1150579124",
        phone: "0987654321",
        direction: "123 Main St",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        dateBorn: "1990-01-01",
        reason: "Checkup",
        version: 1,
        createdAt: new Date("2024-01-01T10:00:00Z"),
        updatedAt: new Date("2024-01-02T15:00:00Z"),
      } as IPatient;
      

      const expectedOutput: PatientType = { 
        names: "John Doe",
        profession: "Engineer",
        dni: "1150579124",
        phone: "0987654321",
        direction: "123 Main St",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        dateBorn: "1990-01-01",
        reason: "Checkup",
        version: 1
       };

      const result = AdapterPatientsToMongoDB.patientModelToPatientType(patient);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("patientTypeToPatientModel", () => {
    it("debería convertir PatientType a IPatient", () => {
      const input: PatientType = {
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
      };

      const expectedOutput: IPatient = { ...input } as IPatient;

      const result = AdapterPatientsToMongoDB.patientTypeToPatientModel(input);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("patientsModelToPatients", () => {
    it("debe convertir un array de IPatient en un array de instancias de pacientes", () => {
      const input: IPatient[] = [
        {
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
        } as IPatient,
      ];

      const result = AdapterPatientsToMongoDB.patientsModelToPatients(input);

      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Patient);
      expect(result[0].getPatientType()).toEqual({
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
      });
    });

    it("debería arrojar un error si el estado civil no es válido", () => {
      const input: IPatient[] = [
        {
          names: "John Doe",
          profession: "Engineer",
          dni: "1150579124",
          phone: "0987654321",
          dateBorn: "1990-01-01",
          direction: "123 Main St",
          maritalStatus: "Unknown",
          sex: "Masculino",
          reason: "Checkup",
          version: 1,
        } as IPatient,
      ];

      expect(() => AdapterPatientsToMongoDB.patientsModelToPatients(input)).toThrow(
        "Marital Status not valid"
      );
    });

    it("debería arrojar un error si el sexo no es válido", () => {
      const input: IPatient[] = [
        {
          names: "John Doe",
          profession: "Engineer",
          dni: "1150579124",
          phone: "0987654321",
          dateBorn: "1990-01-01",
          direction: "123 Main St",
          maritalStatus: "Soltero/a",
          sex: "Unknown",
          reason: "Checkup",
          version: 1,
        } as IPatient,
      ];

      expect(() => AdapterPatientsToMongoDB.patientsModelToPatients(input)).toThrow(
        "Sex not valid"
      );
    });
  });
});
