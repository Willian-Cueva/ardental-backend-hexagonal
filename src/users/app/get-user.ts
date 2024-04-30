import { User } from "../domain/user";
import { GetAllUsers } from "./get-all-users";

export class GetUser {
  constructor(private readonly getAllUsers: GetAllUsers) {}

  run(dni:string): User {
    const user:User | undefined = this.getAllUsers.run().find((el) => el.getUser().dni === dni);
    if (!user || user === undefined) {
      throw new Error("User not found");
    }
    return user;
  }
}
