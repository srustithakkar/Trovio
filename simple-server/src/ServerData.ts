// Operator Classes, Data and functions

enum Roles {
    CUSTOMER_SUPPORT = "CUSTOMER_SUPPORT",
    ADMIN = "ADMIN",
    AUDIT = "AUDIT",
    TREASURY = "TREASURY",
}

interface AccessToken {
    readonly token: string;
    readonly roles: Roles[];
}

interface LoginSuccessResponse {
    readonly id: string;
    readonly username: string;
    readonly accessToken: AccessToken;
}

interface OperatorData {
    readonly id: string;
    readonly username: string;
    readonly password: string;
    readonly accessToken: AccessToken;
}

let ALICE_DETAILS: OperatorData = {
    id: "38c45f97-ac57-498a-987a-673c7e94f704",
    username: "alice",
    password: "password",
    accessToken: {
        token: "svergsgseiugservserva",
        roles: [],
    },
};

let BOB_DETAILS: OperatorData = {
    id: "4ae447dc-ffc3-44a6-a4e8-838167628898",
    username: "bob",
    password: "password",
    accessToken: {
        token: "4w3fvserdgersd",
        roles: [Roles.ADMIN],
    },
};

let CHARLIE_DETAILS: OperatorData = {
    id: "c1be0874-8c24-428e-9c37-5e9a980c000e",
    username: "charlie",
    password: "password",
    accessToken: {
        token: "teiseur43sge",
        roles: [Roles.AUDIT],
    },
};

let DANIEL_DETAILS: OperatorData = {
    id: "c834475e-cc46-4d1b-9ac4-f8f9ab8ccb79",
    username: "daniel",
    password: "password",
    accessToken: {
        token: "brgdsrgesrve",
        roles: [Roles.CUSTOMER_SUPPORT],
    },
};

let ELLIOT_DETAILS: OperatorData = {
    id: "c88ec4fa-dff9-4b5c-86fe-0889448dd6e2",
    username: "elliot",
    password: "password",
    accessToken: {
        token: "gbgdtyjdgsversd",
        roles: [Roles.TREASURY],
    },
};

let operators = [ALICE_DETAILS, BOB_DETAILS, CHARLIE_DETAILS, DANIEL_DETAILS, ELLIOT_DETAILS];

function getOperatorByUserAndPassword(user: string, pass: string): OperatorData | undefined {
    return operators.find((a) => a.username == user && a.password == pass);
}

// This funciton is used by `ensureRole` function from `MockFetchApiUtils` file.
function getOperatorByToken(authToken: string): OperatorData | undefined {
    return operators.find((a) => a.accessToken.token == authToken);
}

// User Classes, Data and functions

enum KycStatus {
    WITH_USER = "WITH_USER",
    WITH_OPERATOR = "WITH_OPERATOR",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED",
}

interface User {
    readonly id: string;
    readonly firstname: string;
    readonly lastname: string;
    kycStatus: KycStatus;
    readonly createdTimestamp: number;
}

let USERS: User[] = [
    {
        id: "1bf243ce-8cb5-40ba-bcf0-8f724119234f",
        firstname: "John",
        lastname: "Smith",
        kycStatus: KycStatus.WITH_USER,
        createdTimestamp: 1656761171622,
    },
    {
        id: "0d438d62-0740-4be7-8594-e101cb90ce86",
        firstname: "Mary",
        lastname: "Grey",
        kycStatus: KycStatus.WITH_OPERATOR,
        createdTimestamp: 1673419724412,
    },
    {
        id: "e0107be2-6d7e-402e-8e3f-6477093475e0",
        firstname: "Tim",
        lastname: "Cook",
        kycStatus: KycStatus.REJECTED,
        createdTimestamp: 1673818815201,
    },
    {
        id: "6978a8db-868a-4846-97dc-b5f4c1e2a00f",
        firstname: "Gary",
        lastname: "Roberto",
        kycStatus: KycStatus.VERIFIED,
        createdTimestamp: 1676337212707,
    },
    {
        id: "cc648b7c-5fc1-4429-a875-c62ad5d06b8d",
        firstname: "David",
        lastname: "McDonald",
        kycStatus: KycStatus.WITH_USER,
        createdTimestamp: 1681137173648,
    },
    {
        id: "8eac152f-6d28-4d33-92b0-763fd79be6d2",
        firstname: "Maria",
        lastname: "Garcia",
        kycStatus: KycStatus.WITH_OPERATOR,
        createdTimestamp: 1676039292774,
    },
    {
        id: "a2956951-f988-4505-ab74-fec4d0224e45",
        firstname: "Timothy",
        lastname: "Johnson",
        kycStatus: KycStatus.WITH_USER,
        createdTimestamp: 1677806550006,
    },
];

let extraUser: User = {
    id: "f98e943a-cbda-41d2-9a84-7d112d031287",
    firstname: "James",
    lastname: "Lambert",
    kycStatus: KycStatus.WITH_OPERATOR,
    createdTimestamp: 1677804550006,
};

export {
    getOperatorByUserAndPassword,
    getOperatorByToken,
    Roles,
    ALICE_DETAILS,
    BOB_DETAILS,
    CHARLIE_DETAILS,
    DANIEL_DETAILS,
    ELLIOT_DETAILS,
    type User,
    USERS,
    extraUser,
    KycStatus,
    type LoginSuccessResponse,
};
