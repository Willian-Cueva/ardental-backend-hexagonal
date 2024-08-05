import { User } from "../../domain/user";
import { RegisterType } from "./types/register-type";
import { Request, Response } from "express";
import { Auth } from "../../app/auth";
import { Account } from "../../domain/account";
import UserModel from "../../../core/config/database/models/account/user";
import AccountModel from "../../../core/config/database/models/account/account";
import { Types } from "mongoose";
import { ResponseServerType } from "./types/response-server-type";
import { LoginType } from "./types/login-type";
import { UserSessionType } from "../../domain/types/user-session-type";
import { Adapter, UserAndAccount } from "../adapter/adapter";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const registerType: RegisterType = req.body;
      const userAndAccount: UserAndAccount =
        Adapter.registerToUserAndAccount(registerType);
      const localUser: User = new User(userAndAccount.user);
      const localAccount: Account = new Account(
        userAndAccount.account,
        registerType.repeatPassword
      );

      const auth: Auth = new Auth(localAccount, localUser);


      const accountsExternal = await AccountModel.find();
      const usersExternal = await UserModel.find();
      const accountsLocal = Adapter.accountsDBToAccounts(accountsExternal);
      const usersLocal = Adapter.usersDBToUsers(usersExternal);
      await auth.registerApp(accountsLocal, usersLocal);

      const user = new UserModel(auth.user.getUser());
      let user_id: Types.ObjectId | null = null;
      await user.save().then((pt) => {
        user_id = pt._id;
      });
      if (user_id === null) throw new Error("Error al registrar el usuario");

      const account = new AccountModel({
        ...auth.account.getAccount(),
        user: user_id,
      });
      await account.save();
      const response: ResponseServerType = {
        message: "ok",
        data: null,
      };
      res.json(response);
    } catch (error) {
      console.log(error);

      const response: ResponseServerType = {
        message: "Ocurrió un error al registrar usuario debido a: " + error,
        data: null,
      };
      res.json(response);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginType: LoginType = req.body;
      console.log(loginType);
      
      const accountsExternal = await AccountModel.find();
      console.log("accountsExternal", accountsExternal);
      
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
        usersLocal
      );

      const data: ResponseServerType = {
        message: "ok",
        data: session,
      };
      res.json(data);
    } catch (error) {
      console.log(error);

      const data: ResponseServerType = {
        message: "No se pudo loguear el usuario debido a " + error,
        data: null,
      };
      res.json(data);
    }
  }
}

export const userController = new UserController();
