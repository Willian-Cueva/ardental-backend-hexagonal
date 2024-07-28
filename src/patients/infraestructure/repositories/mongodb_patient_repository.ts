// src/patients/infrastructure/repositories/MongoDBPatientRepository.ts

import { IRepository } from "../../domain/repositories/irepository";
import { Patient } from "../../domain/patient";
import PatientModel, { IPatient } from "../../../core/config/database/models/patient/patient";
import { AdapterPatientsToMongoDB } from "../adapter/adapter-patients-to-mongodb";

export class MongoDBPatientRepository implements IRepository<Patient> {
  async findAll(): Promise<Patient[]> {
    const patients: IPatient[] = await PatientModel.find();
    return AdapterPatientsToMongoDB.patientsModelToPatients(patients);
  }

  async findById(id: string): Promise<Patient | null> {
    const patient = await PatientModel.findById(id);
    if (!patient) return null;
    return new Patient(AdapterPatientsToMongoDB.patientModelToPatientType(patient));
  }

  async save(patient: Patient): Promise<void> {
    const patientModel = AdapterPatientsToMongoDB.patientTypeToPatientModel(patient.getPatientType());
    await PatientModel.create(patientModel);
  }

  async update(id: string, patient: Patient): Promise<void> {
    const patientModel = AdapterPatientsToMongoDB.patientTypeToPatientModel(patient.getPatientType());
    await PatientModel.findByIdAndUpdate(id, patientModel);
  }

  async delete(id: string): Promise<void> {
    await PatientModel.findByIdAndDelete(id);
  }
}