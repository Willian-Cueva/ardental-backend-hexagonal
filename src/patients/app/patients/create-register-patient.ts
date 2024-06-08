import { ClinicalSigns } from "../../domain/clinical-signs";
import { Odontogram } from "../../domain/odontogram";
import { OralSymp } from "../../domain/oral-symp";
import { Patient } from "../../domain/patient";
import { PersonalHistory } from "../../domain/personal-history";
export class CreateRegisterPatient {
  patient: Patient;
  clinicalSigns: ClinicalSigns;
  odontogram: Odontogram;
  oralSymp: OralSymp;
  personalHistory: PersonalHistory;
  allPatients: Patient[];

  constructor(
    patient: Patient,
    clinicalSigns: ClinicalSigns,
    odontogram: Odontogram,
    oralSymp: OralSymp,
    personalHistory: PersonalHistory,
    allPatients: Patient[]
  ) {
    this.patient = patient;
    this.clinicalSigns = clinicalSigns;
    this.odontogram = odontogram;
    this.oralSymp = oralSymp;
    this.personalHistory = personalHistory;
    this.allPatients = allPatients
  }
  async run() {
    const componentsOfRegister = [
      this.patient,
      this.clinicalSigns,
      this.odontogram,
      this.oralSymp,
      this.personalHistory,
    ];

    componentsOfRegister.forEach((component) => {
      component.create();
    });

    const patientTypeClass = await this.patient.read()
    const patientsRepeated: Patient[] = this.allPatients.filter(async (patient) => {
      const patientType = await patient.read(); 
      return (
        patientType.dni === patientTypeClass.dni
      );
    });

    if (patientsRepeated.length > 0) {
      throw new Error("El paciente ya se encuentra registrado");
    }

    return [this.patient, this.clinicalSigns, this.odontogram, this.oralSymp, this.personalHistory];
  }
}
