import { IPatient } from "@/core/config/database/models/patient/patient";
import { Patient } from "../../domain/patient";
import { PatientType } from "../../domain/types/patient-type";
export class AdapterPatientsToMongoDB {
  static patientModelToPatientType(patient: IPatient): PatientType {
    return {
      names: patient.names,
      profession: patient.profession,
      dni: patient.dni,
      phone: patient.phone,
      dateBorn: patient.dateBorn,
      direction: patient.direction,
      maritalStatus: patient.maritalStatus,
      sex: patient.sex,
      reason: patient.reason,
      version: patient.version,
    } as PatientType;
  }
  static patientTypeToPatientModel(patientType: PatientType): IPatient {
    return {
      names: patientType.names,
      profession: patientType.profession,
      dni: patientType.dni,
      phone: patientType.phone,
      dateBorn: patientType.dateBorn,
      direction: patientType.direction,
      maritalStatus: patientType.maritalStatus,
      sex: patientType.sex,
      reason: patientType.reason,
      version: patientType.version,
    } as IPatient;
  }

  static patientsModelToPatients(patients: IPatient[]): Patient[] {
    return patients.map((patient) => {
      if (
        !(
          patient.maritalStatus === "Soltero/a" ||
          patient.maritalStatus === "Casado/a" ||
          patient.maritalStatus === "Divorciado/a" ||
          patient.maritalStatus === "Viudo/a"
        )
      ) {
        throw new Error("Marital Status not valid");
      }
      if (
        !(
          patient.sex === "Masculino" ||
          patient.sex === "Femenino" ||
          patient.sex === "Otro"
        )
      ) {
        throw new Error("Sex not valid");
      }
      const patientType: PatientType = {
        names: patient.names,
        profession: patient.profession,
        dni: patient.dni,
        phone: patient.phone,
        dateBorn: patient.dateBorn,
        direction: patient.direction,
        maritalStatus: patient.maritalStatus,
        sex: patient.sex,
        reason: patient.reason,
        version: patient.version,
      };
      return new Patient(patientType);
    });
  }
}
