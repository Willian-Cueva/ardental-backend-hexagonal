import { Account } from "../domain/account";
import { IAuth } from "../domain/dependencies/IAuth";
import { UserSessionType } from "../domain/types/user-session-type";
import { User } from "../domain/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class Auth implements IAuth {
  constructor(readonly account: Account, readonly user: User) {}

  async loginApp(
    accounts: Account[],
    users: User[],
    password: string
  ): Promise<UserSessionType> {
    const account = accounts.find(
      (a) => a.getAccount().email === this.account.getAccount().email
    );
    const user = users.find((u) => u.getUser().dni === this.user.getUser().dni);
    if (!account || !user) {
      throw new Error("User or account not found");
    }
    const match = await bcrypt.compare(
      password,
      this.account.getAccount().password
    );
    if (!match) throw new Error("Password not match");

    const session: UserSessionType = {
      fullname: user.getUser().name + " " + user.getUser().lastname,
      rol: user.getUser().rol,
      sex: user.getUser().sex,
      email: account.getAccount().email,
    };

    await this.login();

    //firmamos el token
    jwt.sign(
      { session },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" },
      (err: Error | null, token?: string) => {
        if (err) {
          console.error(err);
        }
        if (token) {
          // Asignamos el token a la sesión
          session.token = token;
        }
      }
    );

    return session;
  }
  async login(): Promise<void> {
    if (!this.user) throw new Error("User not found");
    this.user?.login();
    this.account.login();
    return;
  }
  async register(): Promise<void> {
    if (!this.user) throw new Error("User not found");
    this.user?.register();
    this.account.register();

    return;
  }
}
