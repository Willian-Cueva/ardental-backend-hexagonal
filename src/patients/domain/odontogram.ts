
import { ICrud } from "./dependencies/ICrud";
import { OdontogramType } from "./types/odontogram-type";

export class Odontogram implements ICrud<OdontogramType> {
  private odontogram: OdontogramType | null;

  constructor(odontogram: OdontogramType) {
    this.odontogram = odontogram;
  }

  async create(): Promise<OdontogramType> {
    if (!this.odontogram) throw new Error("Odontogram not found");
    return this.odontogram;
  }

  async read(): Promise<OdontogramType> {
    if (!this.odontogram) throw new Error("Odontogram not found");
    return this.odontogram;
  }

  async update(): Promise<OdontogramType> {
    if (!this.odontogram) throw new Error("Odontogram not found");
    return this.odontogram;
  }

  async delete(): Promise<boolean> {
    this.odontogram = null;
    return this.odontogram == null;
  } 
}
