"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_1 = require("../../domain/user");
const adapter_1 = require("../adapter/adapter");
const auth_1 = require("@users/app/auth");
const account_1 = require("@src/users/domain/account");
const user_2 = __importDefault(require("@src/core/config/database/models/account/user"));
const account_2 = __importDefault(require("@core/config/database/models/account/account"));
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registerType = req.body;
                const userAndAccount = adapter_1.Adapter.registerToUserAndAccount(registerType);
                const auth = new auth_1.Auth(new account_1.Account(userAndAccount.account, registerType.repeatPassword), new user_1.User(userAndAccount.user));
                yield auth.register();
                const user = new user_2.default(auth.user);
                let user_id = null;
                yield user.save().then((pt) => {
                    user_id = pt._id;
                });
                if (user_id === null)
                    throw new Error("Error al registrar el usuario");
                const account = new account_2.default(Object.assign(Object.assign({}, auth.account), { user: user_id }));
                yield account.save();
                const response = {
                    status: "ok",
                    data: null,
                };
                res.json(response);
            }
            catch (error) {
                const response = {
                    status: "Ocurrió un error al registrar usuario",
                    data: null,
                };
                res.json(response);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginType = req.body;
                const accountsExternal = yield account_2.default.find();
                const accountExternal = accountsExternal.find((account) => account.email === loginType.email);
                if (!accountExternal)
                    throw new Error("Credenciales incorrectas");
                //encontrar el usuario
                const userExternal = yield user_2.default.findOne({
                    _id: accountExternal.user,
                });
                if (!userExternal)
                    throw new Error("Credenciales incorrectas");
                const usersExternal = yield user_2.default.find();
                const accountsLocal = adapter_1.Adapter.accountsDBToAccounts(accountsExternal);
                const usersLocal = adapter_1.Adapter.usersDBToUsers(usersExternal);
                const accountLocal = new account_1.Account(loginType, null);
                const userLocal = adapter_1.Adapter.userDBToUser(userExternal);
                const auth = new auth_1.Auth(accountLocal, userLocal);
                const session = yield auth.loginApp(accountsLocal, usersLocal, loginType.password);
                const response = {
                    status: "ok",
                    data: session,
                };
                res.json(response);
            }
            catch (error) {
                const response = {
                    status: "No se pudo registrar el usuario debido a " + error,
                    data: null,
                };
                res.json(response);
            }
        });
    }
}
exports.userController = new UserController();
