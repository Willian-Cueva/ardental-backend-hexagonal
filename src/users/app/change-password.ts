import { Account } from "../domain/account";

export class ChangePassword {
  constructor(private readonly account: Account) {}
  run(password: string): Account {
    this.account.changePassword(password);
    return this.account;
  }
}
