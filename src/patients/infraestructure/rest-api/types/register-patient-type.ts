import { ClinicalSignsType } from "@/patients/domain/types/clinical-signs-type";
import { OdontogramType } from "@/patients/domain/types/odontogram-type";
import { OralSympType } from "@/patients/domain/types/oral-symp-type";
import { PatientType } from "@/patients/domain/types/patient-type";
import { PersonalHistoryType } from "@/patients/domain/types/personal-history-type";

export type RegisterPatientType = {
  personalData: PatientType;
  personalHistory: PersonalHistoryType;
  oralSymp: OralSympType;
  odontogram: OdontogramType;
  clinicalSigns: ClinicalSignsType;
};
