import { Patient } from "../../domain/patient";
import { IPatientRepository } from "../../domain/repositories/ipatient_repository";

export class GetAllPatients {
  constructor(private patientRepository: IPatientRepository) {}

  async run(): Promise<Patient[]> {
    return await this.patientRepository.findAll();
  }
}