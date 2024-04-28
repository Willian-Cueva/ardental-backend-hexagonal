import { UserProps } from "../domain/user-entity";
import { ResponseFormat } from "./response-format";

export interface IAuthenticating {
  login(email: string, password: string): Promise<ResponseFormat>;
  register(user: UserProps): Promise<ResponseFormat>;
}