import { User } from "../../domain/user";
import { RegisterType } from "./types/register-type";
import { Adapter, UserAndAccount } from "../adapter/adapter";
import { Request, Response } from "express";
import { Auth } from "@users/app/auth";
import { Account } from "@src/users/domain/account";
import UserModel from "@src/core/config/database/models/account/user";
import AccountModel from "@core/config/database/models/account/account";
import { Types } from "mongoose";
import { ResponseServerType } from "./types/response-server-type";
import { LoginType } from "./types/login-type";
import { UserSessionType } from "@src/users/domain/types/user-session-type";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const registerType: RegisterType = req.body;
      const userAndAccount: UserAndAccount =
        Adapter.registerToUserAndAccount(registerType);
      const auth: Auth = new Auth(
        new Account(userAndAccount.account, registerType.repeatPassword),
        new User(userAndAccount.user)
      );
      await auth.register();

      const user = new UserModel(auth.user);
      let user_id: Types.ObjectId | null = null;
      await user.save().then((pt) => {
        user_id = pt._id;
      });
      if (user_id === null) throw new Error("Error al registrar el usuario");

      const account = new AccountModel({ ...auth.account, user: user_id });
      await account.save();
      const response: ResponseServerType = {
        status: "ok",
        data: null,
      };
      res.json(response);
    } catch (error) {
      const response: ResponseServerType = {
        status: "Ocurrió un error al registrar usuario",
        data: null,
      };
      res.json(response);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginType: LoginType = req.body;
      const accountsExternal = await AccountModel.find();
      const accountExternal = accountsExternal.find(
        (account) => account.email === loginType.email
      );
      if (!accountExternal) throw new Error("Credenciales incorrectas");
      //encontrar el usuario
      const userExternal = await UserModel.findOne({
        _id: accountExternal.user,
      });
      if (!userExternal) throw new Error("Credenciales incorrectas");

      const usersExternal = await UserModel.find();

      const accountsLocal = Adapter.accountsDBToAccounts(accountsExternal);
      const usersLocal = Adapter.usersDBToUsers(usersExternal);

      const accountLocal: Account = new Account(loginType, null);
      const userLocal: User = Adapter.userDBToUser(userExternal);

      const auth: Auth = new Auth(accountLocal, userLocal);
      const session: UserSessionType = await auth.loginApp(
        accountsLocal,
        usersLocal,
        loginType.password
      );

      const response: ResponseServerType = {
        status: "ok",
        data: session,
      };
      res.json(response);
    } catch (error) {
      const response: ResponseServerType = {
        status: "No se pudo registrar el usuario debido a " + error,
        data: null,
      };
      res.json(response);
    }
  }
}

export const userController = new UserController();
