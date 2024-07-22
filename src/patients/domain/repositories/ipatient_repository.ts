// src/patients/domain/repositories/IPatientRepository.ts

import { Patient } from "../patient";

export interface IPatientRepository {
  findAll(): Promise<Patient[]>;
  findById(id: string): Promise<Patient | null>;
  save(patient: Patient): Promise<void>;
  update(id: string, patient: Patient): Promise<void>;
  delete(id: string): Promise<void>;
}