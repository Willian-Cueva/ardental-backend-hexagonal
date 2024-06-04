import { Request, Response } from "express";
import { RegisterPatientType } from "./types/register-patient-type";
import { Patient } from "@/patients/domain/patient";
import { ClinicalSigns } from "@/patients/domain/clinical-signs";
import { Odontogram } from "@/patients/domain/odontogram";
import { OralSymp } from "@/patients/domain/oral-symp";
import { PersonalHistory } from "@/patients/domain/personal-history";
import { CreateRegisterPatient } from "@/patients/app/create-register-patient";
class PatientsController {
  async createRegisterPatient(req: Request, res: Response) {
    try {
      const registerPatient: RegisterPatientType = req.body;
      const patient = new Patient(registerPatient.personalData);
      const clinicalSigns = new ClinicalSigns(registerPatient.clinicalSigns);
      const odontogram = new Odontogram(registerPatient.odontogram);
      const oralSymp = new OralSymp(registerPatient.oralSymp);
      const personalHistory = new PersonalHistory(
        registerPatient.personalHistory
      );

      const createRegisterPatient = new CreateRegisterPatient(
        patient,
        clinicalSigns,
        odontogram,
        oralSymp,
        personalHistory
      )

      await createRegisterPatient.run();

      
    } catch (error) {
      
    }
  }
}