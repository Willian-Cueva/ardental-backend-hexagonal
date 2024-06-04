import { Account } from "../domain/account";
import { UserSessionType } from "../domain/types/user-session-type";
import { User } from "../domain/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class Auth {
  constructor(readonly account: Account, readonly user: User) {}

  async loginApp(accounts: Account[], users: User[]): Promise<UserSessionType> {
    const account = accounts.find(
      (a) => a.getAccount().email === this.account.getAccount().email
    );
    const user = users.find((u) => u.getUser().dni === this.user.getUser().dni);
    if (!account || !user) {
      throw new Error("User or account not found");
    }

    console.log(
      "Account",
      account.getAccount().password,
      this.account.getAccount().password
    );

    const match = await bcrypt.compare(
      this.account.getAccount().password,
      account.getAccount().password
    );
    if (!match) throw new Error("Credentials not match - p");

    const session: UserSessionType = {
      fullname: user.getUser().name + " " + user.getUser().lastname,
      rol: user.getUser().rol,
      sex: user.getUser().sex,
      email: account.getAccount().email,
      token: false,
    };

    await this.login();

    if (user) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1d",
      });

      session.token = token;
    }

    if (!session.token) {
      throw new Error("Error token is empty");
    }

    return session;
  }

  async registerApp(accounts: Account[], users: User[]): Promise<void> {
    const account = accounts.find(
      (a) => a.getAccount().email === this.account.getAccount().email
    );
    const user = users.find((u) => u.getUser().dni === this.user.getUser().dni);
    if (account || user) {
      throw new Error("User already exists");
    }
    this.register();
    return;
  }
  private async login(): Promise<void> {
    if (!this.user) throw new Error("User not found");
    this.user?.login();
    this.account.login();
    return;
  }
  private async register(): Promise<void> {
    if (!this.user) throw new Error("User not found");
    this.user?.register();
    this.account.register();

    return;
  }
}
