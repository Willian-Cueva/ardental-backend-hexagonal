import { Request, Response } from "express";
import { ResponseServerType } from "../../../users/infraestructure/rest-api/types/response-server-type";
import { GetAllPatients } from "../../app/patients/get-all-patients";
import { PatientType } from "@/patients/domain/types/patient-type";
import { MongoDBPatientRepository } from "../repositories/mongodb_patient_repository";

class PatientsController {

  private patientRepository: MongoDBPatientRepository;

  constructor() {
    this.patientRepository = new MongoDBPatientRepository();
    this.allPatients = this.allPatients.bind(this);
  }

  async allPatients(_req: Request, res: Response) {
    try {
      const getAllPatients = new GetAllPatients(this.patientRepository);
      const patients = await getAllPatients.run();
      const patientsTypeLocal: PatientType[] = patients.map((patient) => patient.getPatientType());

      const response: ResponseServerType = {
        status: "ok",
        data: patientsTypeLocal,
      };
      res.json(response);
    } catch (error) {
      console.error(
        `(AllPatients-Controller) Error al obtener los pacientes debido a: ${error}`
      )
      const response: ResponseServerType = {
        status: `Error al obtener los pacientes debido a: ${error}`,
        data: null,
      };
      res.json(response);
    }
  }
}

export const patientsController = new PatientsController();
