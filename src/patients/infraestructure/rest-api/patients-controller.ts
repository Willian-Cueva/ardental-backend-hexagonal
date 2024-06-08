import { Request, Response } from "express";
import { RegisterPatientType } from "./types/register-patient-type";
import { Patient } from "../../domain/patient";
import { ClinicalSigns } from "../../domain/clinical-signs";
import { Odontogram } from "../../domain/odontogram";
import { OralSymp } from "../../domain/oral-symp";
import { PersonalHistory } from "../../domain/personal-history";
import { CreateRegisterPatient } from "../../app/patients/create-register-patient";
import { AdapterPatientsToMongoDB } from "../adapter/adapter-patients-to-mongodb";
import PatientModel, {
  IPatient,
} from "../../../core/config/database/models/patient/patient";
import { ResponseServerType } from "../../../users/infraestructure/rest-api/types/response-server-type";
import { GetAllPatients } from "../../app/patients/get-all-patients";
import { PatientType } from "@/patients/domain/types/patient-type";

class PatientsController {
  createRegisterPatient = async (req: Request, res: Response) => {
    try {
      const registerPatient: RegisterPatientType = req.body;
      const patient: Patient = new Patient(registerPatient.personalData);
      const clinicalSigns: ClinicalSigns = new ClinicalSigns(
        registerPatient.clinicalSigns
      );
      const odontogram: Odontogram = new Odontogram(registerPatient.odontogram);
      const oralSymp: OralSymp = new OralSymp(registerPatient.oralSymp);
      const personalHistory: PersonalHistory = new PersonalHistory(
        registerPatient.personalHistory
      );

      const patients: IPatient[] = await PatientModel.find();
      const getAllPatients = new GetAllPatients(
        AdapterPatientsToMongoDB.patientsModelToPatients(patients)
      );
      const patientsLocal = await getAllPatients.run();

      const createRegisterPatient = new CreateRegisterPatient(
        patient,
        clinicalSigns,
        odontogram,
        oralSymp,
        personalHistory,
        patientsLocal
      );

      await createRegisterPatient.run();

      const patientType = await createRegisterPatient.patient.read();
      if (!patientType) throw new Error("Patient not found");
      const patientModel =
        AdapterPatientsToMongoDB.patientTypeToPatientModel(patientType);
      const patientDB = new PatientModel(patientModel);
      await patientDB.save();

      const response: ResponseServerType = {
        status: "ok",
        data: patientType,
      };
      res.json(response);
    } catch (error) {
      console.log(error);
      const response: ResponseServerType = {
        status: `Error al guardar el paciente debido a: ${error}`,
        data: null,
      };
      res.json(response);
    }
  };

  async allPatients(_req: Request, res: Response) {
    try {
      const patients: IPatient[] = await PatientModel.find();
      const getAllPatients = new GetAllPatients(
        AdapterPatientsToMongoDB.patientsModelToPatients(patients)
      );
      const patientsLocal = await getAllPatients.run();
      const patientsTypeLocal: PatientType[] = patientsLocal.map((patient) => patient.getPatientType());

      const response: ResponseServerType = {
        status: "ok",
        data: patientsTypeLocal,
      };
      res.json(response);
    } catch (error) {
      const response: ResponseServerType = {
        status: `Error al obtener los pacientes debido a: ${error}`,
        data: null,
      };
      res.json(response);
    }
  }
}

export const patientsController = new PatientsController();
