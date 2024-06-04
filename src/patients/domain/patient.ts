import { Helpers } from "@/users/domain/helpers/helpers";
import { PatientType } from "./types/patient-type";
import { ICrud } from "./dependencies/ICrud";

export class Patient implements ICrud<PatientType> {
  private patient: PatientType | null;

  constructor(patient: PatientType) {
    this.patient = patient;
  }

  async create(): Promise<PatientType> {
    if(!this.patient) throw new Error('Patient not found');
    this.patient.version = 2;
    this.check();
    return this.patient;
  }

  async read(): Promise<PatientType> {
    if(!this.patient) throw new Error('Patient not found');
    this.check();
    return this.patient;
  }

  async update(item: PatientType): Promise<PatientType> {
    this.patient = { ...this.patient, ...item }
    this.check();
    return this.patient;
  }

  async delete(): Promise<boolean> {
    this.patient=null;
    return this.patient==null;
  }

  check(): void {
    if(!this.patient) throw new Error('Patient not found');
    if( !this.patient.names && !Helpers.nameValidate(this.patient.names)) {
      throw new Error('El nombre debe ser al menos de 2 y 15 caracteres');
    }
    if(!this.patient.dni || !Helpers.dniValidate(this.patient.dni)) {
      throw new Error('Debe ingresar una cedula válida y de 10 dígitos');
    }
    if(!this.patient.phone || !Helpers.phoneValidate(this.patient.phone)) {
      throw new Error('El nómero de telefónico debe ser de 10 dígitos');
    }
  }
}
