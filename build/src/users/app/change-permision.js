"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePermission = void 0;
class ChangePermission {
    constructor(account) {
        this.account = account;
    }
    run(password) {
        this.account.changePassword(password);
        return;
    }
}
exports.ChangePermission = ChangePermission;
