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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const helpers_1 = require("./helpers/helpers");
class User {
    constructor(user) {
        this.user = user;
        this.save();
    }
    changePermissions(rol) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user.rol = rol;
            this.save();
            return this.user;
        });
    }
    resquePassword() {
        return __awaiter(this, void 0, void 0, function* () {
            this.user.changePassword = true;
            this.save();
            return;
        });
    }
    getUser() {
        this.save();
        return this.user;
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user = user;
            this.save();
            return this.user;
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            this.save();
            return;
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            this.user.changePassword = false;
            this.user.rol = "not-authorized";
            this.save();
            return;
        });
    }
    save() {
        if (this.user.name == "" || !helpers_1.Helpers.nameValidate(this.user.name)) {
            throw new Error("El nombre es obligatorio y debe tener al menos 2 letras alfabéticas");
        }
        if (!this.user.dni || !helpers_1.Helpers.dniValidate(this.user.dni))
            throw new Error("La cédula del usuario debe ser de 10 dígitos y ser un número de cedula válido");
        if (!this.user.phone || !helpers_1.Helpers.phoneValidate(this.user.phone))
            throw new Error("El nómero de telefónico debe ser de 10 dígitos");
    }
}
exports.User = User;
