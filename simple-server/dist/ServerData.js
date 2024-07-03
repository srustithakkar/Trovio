"use strict";
// Operator Classes, Data and functions
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycStatus = exports.extraUser = exports.USERS = exports.ELLIOT_DETAILS = exports.DANIEL_DETAILS = exports.CHARLIE_DETAILS = exports.BOB_DETAILS = exports.ALICE_DETAILS = exports.Roles = exports.getOperatorByToken = exports.getOperatorByUserAndPassword = void 0;
var Roles;
(function (Roles) {
    Roles["CUSTOMER_SUPPORT"] = "CUSTOMER_SUPPORT";
    Roles["ADMIN"] = "ADMIN";
    Roles["AUDIT"] = "AUDIT";
    Roles["TREASURY"] = "TREASURY";
})(Roles || (Roles = {}));
exports.Roles = Roles;
let ALICE_DETAILS = {
    id: "38c45f97-ac57-498a-987a-673c7e94f704",
    username: "alice",
    password: "password",
    accessToken: {
        token: "svergsgseiugservserva",
        roles: [],
    },
};
exports.ALICE_DETAILS = ALICE_DETAILS;
let BOB_DETAILS = {
    id: "4ae447dc-ffc3-44a6-a4e8-838167628898",
    username: "bob",
    password: "password",
    accessToken: {
        token: "4w3fvserdgersd",
        roles: [Roles.ADMIN],
    },
};
exports.BOB_DETAILS = BOB_DETAILS;
let CHARLIE_DETAILS = {
    id: "c1be0874-8c24-428e-9c37-5e9a980c000e",
    username: "charlie",
    password: "password",
    accessToken: {
        token: "teiseur43sge",
        roles: [Roles.AUDIT],
    },
};
exports.CHARLIE_DETAILS = CHARLIE_DETAILS;
let DANIEL_DETAILS = {
    id: "c834475e-cc46-4d1b-9ac4-f8f9ab8ccb79",
    username: "daniel",
    password: "password",
    accessToken: {
        token: "brgdsrgesrve",
        roles: [Roles.CUSTOMER_SUPPORT],
    },
};
exports.DANIEL_DETAILS = DANIEL_DETAILS;
let ELLIOT_DETAILS = {
    id: "c88ec4fa-dff9-4b5c-86fe-0889448dd6e2",
    username: "elliot",
    password: "password",
    accessToken: {
        token: "gbgdtyjdgsversd",
        roles: [Roles.TREASURY],
    },
};
exports.ELLIOT_DETAILS = ELLIOT_DETAILS;
let operators = [ALICE_DETAILS, BOB_DETAILS, CHARLIE_DETAILS, DANIEL_DETAILS, ELLIOT_DETAILS];
function getOperatorByUserAndPassword(user, pass) {
    return operators.find((a) => a.username == user && a.password == pass);
}
exports.getOperatorByUserAndPassword = getOperatorByUserAndPassword;
// This funciton is used by `ensureRole` function from `MockFetchApiUtils` file.
function getOperatorByToken(authToken) {
    return operators.find((a) => a.accessToken.token == authToken);
}
exports.getOperatorByToken = getOperatorByToken;
// User Classes, Data and functions
var KycStatus;
(function (KycStatus) {
    KycStatus["WITH_USER"] = "WITH_USER";
    KycStatus["WITH_OPERATOR"] = "WITH_OPERATOR";
    KycStatus["VERIFIED"] = "VERIFIED";
    KycStatus["REJECTED"] = "REJECTED";
})(KycStatus || (KycStatus = {}));
exports.KycStatus = KycStatus;
let USERS = [
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
exports.USERS = USERS;
let extraUser = {
    id: "f98e943a-cbda-41d2-9a84-7d112d031287",
    firstname: "James",
    lastname: "Lambert",
    kycStatus: KycStatus.WITH_OPERATOR,
    createdTimestamp: 1677804550006,
};
exports.extraUser = extraUser;
