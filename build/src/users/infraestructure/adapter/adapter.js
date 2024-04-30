"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adapter = void 0;
const account_1 = require("../../domain/account");
const user_1 = require("@src/users/domain/user");
class Adapter {
    static registerToUserAndAccount(registerType) {
        const user = {
            name: registerType.name,
            lastname: registerType.lastname,
            dni: registerType.dni,
            dateBorn: registerType.dateBorn,
            phone: registerType.phone,
            sex: registerType.sex,
            changePassword: false,
            rol: "not-authorized",
        };
        const account = {
            email: registerType.email,
            password: registerType.password,
        };
        return { user, account };
    }
    static accountDBToAccount(accountDB) {
        if (accountDB == null) {
            throw new Error("Account not found");
        }
        else if (accountDB.email == null || accountDB.password == null) {
            throw new Error("Account not found");
        }
        return new account_1.Account({
            email: accountDB.email,
            password: accountDB.password,
        }, null);
    }
    static accountsDBToAccounts(accountsDB) {
        return accountsDB.map((accountDB) => Adapter.accountDBToAccount(accountDB));
    }
    static userDBToUser(userDB) {
        if (!userDB ||
            !userDB.name ||
            !userDB.lastname ||
            !userDB.dni ||
            !userDB.dateBorn ||
            !userDB.phone ||
            !userDB.sex ||
            !userDB.changePassword ||
            !userDB.rol) {
            throw new Error("User data is incomplete");
        }
        // Verificar si el sexo es un valor válido
        if (!["Masculino", "Femenino", "Otro"].includes(userDB.sex)) {
            throw new Error("Invalid sex type");
        }
        // "admin" | "not-authorized" | "super-administrer"
        if (!["admin", "not-authorized", "super-administrer"].includes(userDB.rol)) {
            throw new Error("Invalid rol type");
        }
        return new user_1.User({
            name: userDB.name,
            lastname: userDB.lastname,
            dni: userDB.dni,
            dateBorn: userDB.dateBorn,
            phone: userDB.phone,
            sex: userDB.sex,
            changePassword: userDB.changePassword,
            rol: userDB.rol,
        });
    }
    static usersDBToUsers(usersDB) {
        return usersDB.map((userDB) => Adapter.userDBToUser(userDB));
    }
}
exports.Adapter = Adapter;
