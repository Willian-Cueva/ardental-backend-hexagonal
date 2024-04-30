"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
class GetUser {
    constructor(getAllUsers) {
        this.getAllUsers = getAllUsers;
    }
    run(dni) {
        const user = this.getAllUsers.run().find((el) => el.getUser().dni === dni);
        if (!user || user === undefined) {
            throw new Error("User not found");
        }
        return user;
    }
}
exports.GetUser = GetUser;
