import { Helpers } from "../domain/helpers/helpers";
import { PatientType } from "./types/patient-type";
import { ICrud } from "./dependencies/ICrud";

export class Patient implements ICrud<PatientType> {
  patient: PatientType | null;

  constructor(patient: PatientType | null | undefined) {
    if (!patient || typeof patient !== "object" || !("names" in patient)) {
      throw new Error("Patient not found");
    }
    this.patient = patient;
  }

  getPatientType(): PatientType {
    if (this.patient === null || this.patient === undefined) {
      throw new Error("Patient not found");
    }
    return this.patient;
  }

  async create(): Promise<PatientType> {
    if (!this.patient || this.patient === null || this.patient === undefined) {
      throw new Error("Patient not found");
    }

    this.patient.version = 2;
    this.check();
    return this.patient;
  }

  async read(): Promise<PatientType> {
    if (!this.patient) throw new Error("Patient not found");
    this.check();
    return this.patient;
  }

  async update(item: Partial<PatientType>): Promise<PatientType> {
    if (!this.patient) {
      throw new Error("Patient not found");
    }
    this.patient = { ...this.patient, ...item };
    this.check();
    return this.patient;
  }

  async delete(): Promise<boolean> {
    if (!this.patient) {
      throw new Error("Patient not found");
    }
    this.patient = null;
    return true;
  }

  check(): void {
    if (!this.patient) throw new Error("Patient not found");
    if (!this.patient.names || !Helpers.nameValidate(this.patient.names)) {
      throw new Error("El nombre debe ser al menos de 2 y 50 caracteres alfabéticos");
    }
    if (!this.patient.dni || !Helpers.dniValidate(this.patient.dni)) {
      throw new Error("Debe ingresar una cédula válida y de 10 dígitos");
    }
  }
}
