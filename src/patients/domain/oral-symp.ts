import { ICrud } from "./dependencies/ICrud";
import { OralSympType } from "./types/oral-symp-type";

export class OralSymp implements ICrud<OralSympType> {
  private oralSymp: OralSympType | null;
  constructor(oralSymp: OralSympType) {
    this.oralSymp = oralSymp;
  }

  async create(): Promise<OralSympType> {
    if (!this.oralSymp) throw new Error("OralSymp not found");
    return this.oralSymp;
  }

  async read(): Promise<OralSympType> {
    if (!this.oralSymp) throw new Error("OralSymp not found");
    return this.oralSymp;
  }

  async update(item: OralSympType): Promise<OralSympType> {
    this.oralSymp = { ...this.oralSymp, ...item };
    if (!this.oralSymp) throw new Error("OralSymp not found");
    return this.oralSymp;
  }

  async delete(): Promise<boolean> {
    this.oralSymp = null;
    return this.oralSymp == null;
  }
}