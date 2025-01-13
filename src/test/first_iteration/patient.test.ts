import { Patient } from "../../patients/domain/patient";
import { PatientType } from "../../patients/domain/types/patient-type";

describe("Patient", () => {
  describe("constructor", () => {
    it("debe establecer la propiedad patient correctamente", () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1234567890",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      expect(patientInstance.patient).toEqual(patient);
    });

    it("debe lanzar un error cuando patient es null", () => {
      expect(() => new Patient(null)).toThrow("Patient not found");
    });

    it("debe lanzar un error cuando patient es undefined", () => {
      expect(() => new Patient(undefined)).toThrow("Patient not found");
    });

    it("debe lanzar un error cuando patient no es de tipo PatientType", () => {
      const invalidPatient = "Invalid patient";
      expect(() => new Patient(invalidPatient as any)).toThrow(
        "Patient not found"
      );
    });
  });

  describe("getPatientType", () => {
    it("debe devolver el paciente correctamente", () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1234567890",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      expect(patientInstance.getPatientType()).toEqual(patient);
    });

    it("debe lanzar un error cuando el paciente no existe", () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1234567890",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      patientInstance.patient = null;
      expect(() => patientInstance.getPatientType()).toThrow(
        "Patient not found"
      );
    });
  });

  describe("create", () => {
    it("debe devolver el paciente creado correctamente", async () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1150579124",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 2,
      };
      const patientInstance = new Patient(patient);
      const createdPatient = await patientInstance.create();
      expect(createdPatient).toEqual(patient);
    });

    it("debe lanzar un error cuando el paciente no existe", async () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1234567890",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      patientInstance.patient = null;
      expect(() => patientInstance.create()).rejects.toThrow(
        "Patient not found"
      );
    });
  });

  describe("read", () => {
    it("debe devolver el paciente si existe", async () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1150579124",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      const readPatient = await patientInstance.read();
      expect(readPatient).toEqual(patient);
    });

    it("debe lanzar un error cuando el paciente no existe", async () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1150579124",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      patientInstance.patient = null;
      expect(() => patientInstance.read()).rejects.toThrow("Patient not found");
    });
  });

  describe("update", () => {
    it("debe actualizar el paciente correctamente", async () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1150579124",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      const updates: Partial<PatientType> = {
        names: "Jane Doe",
        profession: "Doctor",
      };
      const updatedPatient = await patientInstance.update(updates);
      expect(updatedPatient).toEqual({ ...patient, ...updates });
    });

    it("debe lanzar un error cuando el paciente no existe", async () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1150579124",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      patientInstance.patient = null;
      await expect(patientInstance.update({})).rejects.toThrow(
        "Patient not found"
      );
    });
  });

  describe("delete", () => {
    it("debe devolver true si existe el paciente", async () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1150579124",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      const deleted = await patientInstance.delete();
      expect(deleted).toBe(true);
    });

    it("debe lanzar un error cuando el paciente no existe", async () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1150579124",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      patientInstance.patient = null;
      expect(() => patientInstance.delete()).rejects.toThrow(
        "Patient not found"
      );
    });
  });

  describe("Patient.check()", () => {
    it("should throw error if patient not found", () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1150579124",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      patientInstance.patient = null;
      expect(() => patientInstance.check()).toThrow("Patient not found");
    });

    it("should throw error if patient name is empty", () => {
      const patient: PatientType = {
        names: "",
        profession: "Engineer",
        dni: "1150579124",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      expect(() => patientInstance.check()).toThrow(
        "El nombre debe ser al menos de 2 y 50 caracteres alfabéticos"
      );
    });

    it("should throw error if patient name is invalid format", () => {
      const patient: PatientType = {
        names: "J",
        profession: "Engineer",
        dni: "1150579124",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      expect(() => patientInstance.check()).toThrow(
        "El nombre debe ser al menos de 2 y 50 caracteres alfabéticos"
      );
    });

    it("should throw error if patient DNI is empty", () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      expect(() => patientInstance.check()).toThrow(
        "Debe ingresar una cédula válida y de 10 dígitos"
      );
    });

    it("should throw error if patient DNI is invalid format", () => {
      const patient: PatientType = {
        names: "John Doe",
        profession: "Engineer",
        dni: "1234567890",
        phone: "0987654321",
        dateBorn: "1990-01-01",
        direction: "Somewhere",
        maritalStatus: "Soltero/a",
        sex: "Masculino",
        reason: "Checkup",
        version: 1,
      };
      const patientInstance = new Patient(patient);
      expect(() => patientInstance.check()).toThrow(
        "Debe ingresar una cédula válida y de 10 dígitos"
      );
    });
  });
});
