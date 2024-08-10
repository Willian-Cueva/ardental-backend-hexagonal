import { SexType } from "./sex-type";
import { MaritalStatusType } from "./marital-status-type";

export type PatientType = {
  names: string;
  profession: string;
  dni: string;
  phone: string;
  dateBorn: string;
  direction: string;
  maritalStatus: MaritalStatusType;
  sex: SexType;
  reason: string;
  version: number;
}