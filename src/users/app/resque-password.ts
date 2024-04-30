import { User } from "../domain/user";

export class ResquePassword {
  constructor(private readonly user:User){}
  run(): void{
    this.user.resquePassword();
    return;
  }
}