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
exports.Account = void 0;
const helpers_1 = require("./helpers/helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
class Account {
    constructor(account, repeatPassword) {
        this.account = account;
        this.repeatPassword = repeatPassword;
        this.save();
    }
    getAccount() {
        return this.account;
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            this.save();
            return;
        });
    }
    changePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password)
                throw new Error("La contraseña no puede estar vacía");
            if (!helpers_1.Helpers.passwordValidate(password))
                throw new Error("La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número");
            this.account.password = password;
            this.save();
            return;
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.repeatPassword || this.repeatPassword === null) {
                throw new Error("RepeatPassword is required");
            }
            if (this.account.email !== this.repeatPassword) {
                throw new Error("The passwords do not match");
            }
            bcrypt_1.default
                .genSalt(10)
                .then((salts) => {
                bcrypt_1.default
                    .hash(this.account.password, salts)
                    .then((hash) => {
                    this.account.password = hash;
                })
                    .catch((err) => console.log(err));
            })
                .catch((err) => console.log(err));
            this.save();
            return;
        });
    }
    save() {
        if (!this.account.email) {
            throw new Error("Email is required");
        }
        if (!helpers_1.Helpers.emailValidate(this.account.email)) {
            throw new Error("Email is not valid");
        }
        if (!this.account.password) {
            throw new Error("Password is required");
        }
        if (!helpers_1.Helpers.passwordValidate(this.account.password)) {
            throw new Error("La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número");
        }
    }
}
exports.Account = Account;
