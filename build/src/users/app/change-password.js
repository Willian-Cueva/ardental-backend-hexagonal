"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePassword = void 0;
class ChangePassword {
    constructor(account) {
        this.account = account;
    }
    run(password) {
        this.account.changePassword(password);
        return this.account;
    }
}
exports.ChangePassword = ChangePassword;
