import { Patient } from "../../domain/patient";
import { IRepository } from "../../domain/repositories/irepository";

export class GetAllPatients {
  constructor(private patientRepository: IRepository<Patient>) {}

  async run(): Promise<Patient[]> {
    return await this.patientRepository.findAll();
  }
}