import { Account } from "../domain/account";
export class ChangePermission {
  constructor(private readonly account: Account){}
  run(password: string): void{
    this.account.changePassword(password);
    return;
  }
}