import { UserType } from "../domain/types/user-type";
import { User } from "../domain/user";

export class UpdateUser {
  constructor(private readonly user:User){}
  async run(): Promise<void> {
    const user:UserType = await this.user.getUser()
    this.user.updateUser(user);
    return;
  }
}