import { RolType } from "../types/rol-type";
import { UserType } from "../types/user-type";

export interface IUser{
  changePermissions(rol: RolType): Promise<UserType>;
  resquePassword(): Promise<void>;
  getUser(): UserType;
  updateUser(user: UserType): Promise<UserType>;
}