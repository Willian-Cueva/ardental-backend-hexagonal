import { ICrud } from "./dependencies/icrud";
import { PersonalHistoryType } from "./types/personal-history-type";

export class PersonalHistory implements ICrud<PersonalHistoryType> {
  private personalHistory: PersonalHistoryType | null
  constructor(personalHistory: PersonalHistoryType) {
    this.personalHistory = personalHistory;
  }

  async create(): Promise<PersonalHistoryType> {
    if(!this.personalHistory) throw new Error('PersonalHistory not found');
    return this.personalHistory;
  }
  async read(): Promise<PersonalHistoryType> {
    if(!this.personalHistory) throw new Error('PersonalHistory not found');
    return this.personalHistory;
  }
  async update(item: PersonalHistoryType): Promise<PersonalHistoryType> {
    this.personalHistory = { ...this.personalHistory, ...item }
    if(!this.personalHistory) throw new Error('PersonalHistory not found');
    return this.personalHistory;
  }
  async delete(): Promise<boolean> {
    this.personalHistory=null;
    return this.personalHistory==null;
  }
}