import { User } from "../domain/user";

export class GetAllUsers {
  constructor(private readonly users: User[]) {}
  run(): User[] {
    return this.users;
  }
}
