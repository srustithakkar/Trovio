import { KycStatus, USERS, User, extraUser } from "./ServerData";

class UserService {
    userstore: Map<string, User>;

    constructor() {
        this.userstore = new Map();
        USERS.forEach((u) => this.userstore.set(u.id, u));
    }

    public getUsers(kycStatus?: KycStatus): User[] {
        if (this.userstore.get(extraUser.id)) {
            this.userstore.delete(extraUser.id);
        } else {
            this.userstore.set(extraUser.id, extraUser);
        }

        if (kycStatus === undefined) {
            return Array.from(this.userstore.values());
        }

        return Array.from(this.userstore.values()).filter((u) => u.kycStatus == kycStatus);
    }

    public updateUser(id: string, status: KycStatus): void {
        let user = this.userstore.get(id);
        if (user === undefined) {
            throw new Error("User does not exist");
        }
        user.kycStatus = status;
        this.userstore.set(id, user);
    }
}

export { UserService };
