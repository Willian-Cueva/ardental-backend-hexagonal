import { Patient } from "../../domain/patient";
import { PatientType } from "../../domain/types/patient-type";

export class GetAllPatients{
  private patients: Patient[];
  constructor(patients: Patient[]) {
    this.patients = patients;
  }

  async run(): Promise<Patient[]> {
    if(!this.patients) throw new Error('Patients not found');
    const patients: Patient[] = [];
    this.patients.forEach(async (patient) => {
      const patientType: PatientType = await patient.read();
      patients.push(new Patient(patientType));
    });
    return patients;
  }
}