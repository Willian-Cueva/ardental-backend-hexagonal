
import { ICrud } from "./dependencies/ICrud";
import { ClinicalSignsType } from "./types/clinical-signs-type";

export class ClinicalSigns implements ICrud<ClinicalSignsType> {
  private clinicalSigns: ClinicalSignsType | null
  
  constructor(clinicalSigns: ClinicalSignsType | null) {
    this.clinicalSigns = clinicalSigns;
  }

  async create(): Promise<ClinicalSignsType> {
    if (!this.clinicalSigns) throw new Error("ClinicalSigns not found");
    return this.clinicalSigns;
  }

  async read(): Promise<ClinicalSignsType> {
    if (!this.clinicalSigns) throw new Error("ClinicalSigns not found");
    return this.clinicalSigns;
  }

  async update(item: ClinicalSignsType): Promise<ClinicalSignsType> {
    this.clinicalSigns = { ...this.clinicalSigns, ...item };
    if (!this.clinicalSigns) throw new Error("ClinicalSigns not found");
    return this.clinicalSigns;
  }

  async delete(): Promise<boolean> {
    if (!this.clinicalSigns) throw new Error("ClinicalSigns not found");
    return true;
  }
}