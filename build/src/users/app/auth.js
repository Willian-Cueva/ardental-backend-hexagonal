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
exports.Auth = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
    constructor(account, user) {
        this.account = account;
        this.user = user;
    }
    loginApp(accounts, users, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = accounts.find((a) => a.getAccount().email === this.account.getAccount().email);
            const user = users.find((u) => u.getUser().dni === this.user.getUser().dni);
            if (!account || !user) {
                throw new Error("User or account not found");
            }
            const match = yield bcrypt_1.default.compare(password, this.account.getAccount().password);
            if (!match)
                throw new Error("Password not match");
            const session = {
                fullname: user.getUser().name + " " + user.getUser().lastname,
                rol: user.getUser().rol,
                sex: user.getUser().sex,
                email: account.getAccount().email,
            };
            yield this.login();
            //firmamos el token
            jsonwebtoken_1.default.sign({ session }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" }, (err, token) => {
                if (err) {
                    console.error(err);
                }
                if (token) {
                    // Asignamos el token a la sesión
                    session.token = token;
                }
            });
            return session;
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!this.user)
                throw new Error("User not found");
            (_a = this.user) === null || _a === void 0 ? void 0 : _a.login();
            this.account.login();
            return;
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!this.user)
                throw new Error("User not found");
            (_a = this.user) === null || _a === void 0 ? void 0 : _a.register();
            this.account.register();
            return;
        });
    }
}
exports.Auth = Auth;
