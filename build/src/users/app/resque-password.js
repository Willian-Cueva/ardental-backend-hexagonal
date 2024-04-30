"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResquePassword = void 0;
class ResquePassword {
    constructor(user) {
        this.user = user;
    }
    run() {
        this.user.resquePassword();
        return;
    }
}
exports.ResquePassword = ResquePassword;
