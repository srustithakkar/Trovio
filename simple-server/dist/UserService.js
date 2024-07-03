"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const ServerData_1 = require("./ServerData");
class UserService {
    constructor() {
        this.userstore = new Map();
        ServerData_1.USERS.forEach((u) => this.userstore.set(u.id, u));
    }
    getUsers(kycStatus) {
        if (this.userstore.get(ServerData_1.extraUser.id)) {
            this.userstore.delete(ServerData_1.extraUser.id);
        }
        else {
            this.userstore.set(ServerData_1.extraUser.id, ServerData_1.extraUser);
        }
        if (kycStatus === undefined) {
            return Array.from(this.userstore.values());
        }
        return Array.from(this.userstore.values()).filter((u) => u.kycStatus == kycStatus);
    }
    updateUser(id, status) {
        let user = this.userstore.get(id);
        if (user === undefined) {
            throw new Error("User does not exist");
        }
        user.kycStatus = status;
        this.userstore.set(id, user);
    }
}
exports.UserService = UserService;
