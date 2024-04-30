import { IAuth } from "./dependencies/IAuth";
import { Helpers } from "./helpers/helpers";
import { AccountType } from "./types/account-type";
import bcrypt from "bcrypt";

export class Account implements IAuth {
  private account: AccountType;
  private repeatPassword: string|null
  constructor(account: AccountType, repeatPassword: string|null) {
    this.account = account;
    this.repeatPassword = repeatPassword;
    this.save();
  }

  getAccount(): AccountType {
    return this.account;
  }

  async login(): Promise<void> {
    this.save();
    return;
  }

  async changePassword(password: string): Promise<void> {
    if (!password) throw new Error("La contraseña no puede estar vacía");
    if (!Helpers.passwordValidate(password))
      throw new Error(
        "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número"
      );

    this.account.password = password;
    this.save();
    return;
  }

  async register(): Promise<void> {
    if(!this.repeatPassword||this.repeatPassword===null){
      throw new Error("RepeatPassword is required");
    }
    if (this.account.email !== this.repeatPassword) {
      throw new Error("The passwords do not match");
    }

    bcrypt
      .genSalt(10)
      .then((salts) => {
        bcrypt
          .hash(this.account.password, salts)
          .then((hash) => {
            this.account.password = hash;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    this.save();
    return;
  }

  save() {
    if (!this.account.email) {
      throw new Error("Email is required");
    }
    if (!Helpers.emailValidate(this.account.email)) {
      throw new Error("Email is not valid");
    }
    if (!this.account.password) {
      throw new Error("Password is required");
    }
    if (!Helpers.passwordValidate(this.account.password)) {
      throw new Error(
        "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número"
      );
    }
  }
}
