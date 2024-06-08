import { IPatient } from "@/core/config/database/models/patient/patient";
import { Patient } from "../../domain/patient";
import { PatientType } from "../../domain/types/patient-type";
export class AdapterPatientsToMongoDB {	
  static patientTypeToPatientModel(patientType: PatientType): IPatient {
    const patientModel: IPatient = {} as IPatient;
    patientModel.names = patientType.names;
    patientModel.profession = patientType.profession;
    patientModel.dni = patientType.dni;
    patientModel.phone = patientType.phone;
    patientModel.dateBorn = patientType.dateBorn;
    patientModel.direction = patientType.direction;
    patientModel.maritalStatus = patientType.maritalStatus;
    patientModel.sex = patientType.sex;
    patientModel.reason = patientType.reason;
    patientModel.version = patientType.version;
    return patientModel;
  }

  static patientsModelToPatients(patients: IPatient[]): Patient[] {
    const patientsType: Patient[] = [];
    patients.forEach((patient) => {
      const patientType: PatientType = {} as PatientType;
      if (!(patient.maritalStatus === "Soltero/a" || patient.maritalStatus === "Casado/a" || patient.maritalStatus === "Divorciado/a" || patient.maritalStatus === "Viudo/a")) throw new Error("Marital Status not valid");
      if (!(patient.sex === "Masculino" || patient.sex === "Femenino" || patient.sex === "Otro")) throw new Error("Sex not valid");
      patientType.names = patient.names;
      patientType.profession = patient.profession;
      patientType.dni = patient.dni;
      patientType.phone = patient.phone;
      patientType.dateBorn = patient.dateBorn;
      patientType.direction = patient.direction;
      patientType.maritalStatus = patient.maritalStatus;
      patientType.sex = patient.sex;
      patientType.reason = patient.reason;
      patientType.version = patient.version;
      patientsType.push(new Patient(patientType));
    });
    return patientsType;
  }
}
