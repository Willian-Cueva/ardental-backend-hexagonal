import { UserType } from "@/users/domain/types/user-type";
import { SexType } from "@/users/domain/types/sex-type";
import { AccountType } from "@/users/domain/types/account-type";
import { RegisterType } from "../rest-api/types/register-type";
import { IAccount } from "@/core/config/database/models/account/account";
import { Account } from "../../domain/account";
import { IUser } from "@/core/config/database/models/account/user";
import { RolType } from "@/users/domain/types/rol-type";
import { User } from "../../domain/user";

export type UserAndAccount = { user: UserType; account: AccountType };
export class Adapter {
  static registerToUserAndAccount(registerType: RegisterType): UserAndAccount {
    const user: UserType = {
      name: registerType.name,
      lastname: registerType.lastname,
      dni: registerType.dni,
      dateBorn: registerType.dateBorn,
      phone: registerType.phone,
      sex: registerType.sex,
      changePassword: false,
      rol: "not-authorized",
    };
    const account: AccountType = {
      email: registerType.email,
      password: registerType.password,
    };
    return { user, account } as UserAndAccount;
  }

  static accountDBToAccount(accountDB: IAccount): Account {
    if (accountDB == null) {
      throw new Error("Account not found");
    } else if (accountDB.email == null || accountDB.password == null) {
      throw new Error("Account not found");
    }
    return new Account(
      {
        email: accountDB.email,
        password: accountDB.password,
      },
      null
    );
  }

  static accountsDBToAccounts(accountsDB: IAccount[]): Account[] {
    return accountsDB.map((accountDB) => Adapter.accountDBToAccount(accountDB));
  }

  static userDBToUser(userDB: IUser): User {
    // Verificar si el sexo es un valor válido
    if (!["Masculino", "Femenino", "Otro"].includes(userDB.sex)) {
      throw new Error("Invalid sex type");
    }
    // "admin" | "not-authorized" | "super-administrer"
    if (
      !["admin", "not-authorized", "super-administrer"].includes(userDB.rol)
    ) {
      throw new Error("Invalid rol type");
    }
    return new User({
      name: userDB.name,
      lastname: userDB.lastname,
      dni: userDB.dni,
      dateBorn: userDB.dateBorn,
      phone: userDB.phone,
      sex: userDB.sex as SexType,
      changePassword: userDB.changePassword,
      rol: userDB.rol as RolType,
    });
  }

  static usersDBToUsers(usersDB: IUser[]): User[] {
    return usersDB.map((userDB) => Adapter.userDBToUser(userDB));
  }
}
