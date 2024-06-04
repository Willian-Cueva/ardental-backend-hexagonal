import { ClinicalSigns } from "../domain/clinical-signs";
import { Odontogram } from "../domain/odontogram";
import { OralSymp } from "../domain/oral-symp";
import { Patient } from "../domain/patient";
import { PersonalHistory } from "../domain/personal-history";
export class CreateRegisterPatient {
  private readonly patient: Patient;
  private readonly clinicalSigns: ClinicalSigns;
  private readonly odontogram: Odontogram;
  private readonly oralSymp: OralSymp;
  private readonly personalHistory: PersonalHistory;

  constructor(
    patient: Patient,
    clinicalSigns: ClinicalSigns,
    odontogram: Odontogram,
    oralSymp: OralSymp,
    personalHistory: PersonalHistory
  ) {
    this.patient = patient;
    this.clinicalSigns = clinicalSigns;
    this.odontogram = odontogram;
    this.oralSymp = oralSymp;
    this.personalHistory = personalHistory;
  }

  run() {
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
  }
}
