"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const ServerData_1 = require("./ServerData");
const UserService_1 = require("./UserService");
const ServerUtils_1 = require("./ServerUtils");
const CarbonService_1 = require("./CarbonService");
const PORT = 8080;
const userService = new UserService_1.UserService();
const carbonService = new CarbonService_1.CarbonService();
const server = (0, http_1.createServer)((req, res) => {
    // Handling the OPTIONS request here
    if (req.method === "OPTIONS") {
        res.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Length": 0,
        });
        return res.end();
    }
    const { pathname, searchParams } = (0, ServerUtils_1.parseUrl)(req.url || "");
    switch (pathname) {
        case "/api/login":
            handleLoginRequest(req, res);
            break;
        case "/api/projects":
            if (req.method === "GET") {
                handleGetProjectDetailsRequest(req, res);
            }
            else {
                (0, ServerUtils_1.send4xxResponse)(res, 404);
                return;
            }
            break;
        // case "/api/user":
        //   if (req.method === "GET") {
        //     handleGetUserRequest(req, res, searchParams);
        //   } else if (req.method === "POST") {
        //     handlePostUserRequest(req, res);
        //   } else {
        //     send4xxResponse(res, 404);
        //     return;
        //   }
        //   break;
        default:
            (0, ServerUtils_1.send4xxResponse)(res, 404);
            return;
    }
});
function handleLoginRequest(req, res) {
    if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            try {
                const requestBody = JSON.parse(body);
                let operator = (0, ServerData_1.getOperatorByUserAndPassword)(requestBody.username, requestBody.password);
                if (operator) {
                    let loginSuccessResponse = {
                        id: operator.id,
                        username: operator.username,
                        accessToken: operator.accessToken,
                    };
                    res.writeHead(200, {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    });
                    res.end(JSON.stringify(loginSuccessResponse));
                }
                else {
                    (0, ServerUtils_1.send4xxResponse)(res, 401);
                    return;
                }
            }
            catch (e) {
                (0, ServerUtils_1.send4xxResponse)(res, 400);
            }
        });
    }
    else {
        (0, ServerUtils_1.send4xxResponse)(res, 404);
        return;
    }
}
function handleGetProjectDetailsRequest(req, res) {
    try {
        if (!(0, ServerUtils_1.isAuthorized)(req, [])) {
            (0, ServerUtils_1.send4xxResponse)(res, 401);
            return;
        }
        const projectDetails = carbonService.getCarbonProjectDetails();
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify(projectDetails));
    }
    catch (e) {
        (0, ServerUtils_1.send4xxResponse)(res, 400);
    }
}
function handleGetUserRequest(req, res, queryParams) {
    try {
        if (!(0, ServerUtils_1.isAuthorized)(req, [ServerData_1.Roles.CUSTOMER_SUPPORT, ServerData_1.Roles.ADMIN, ServerData_1.Roles.AUDIT])) {
            (0, ServerUtils_1.send4xxResponse)(res, 401);
            return;
        }
        let users;
        const kycStatusParam = queryParams.get("kycStatus");
        if (kycStatusParam == null) {
            users = userService.getUsers();
        }
        else {
            let kycStatus = ServerData_1.KycStatus[kycStatusParam];
            if (kycStatus === undefined) {
                (0, ServerUtils_1.send4xxResponse)(res, 400, `Invalid kycStatus: ${kycStatusParam}`);
                return;
            }
            users = userService.getUsers(kycStatus);
        }
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify(users));
    }
    catch (e) {
        (0, ServerUtils_1.send4xxResponse)(res, 400);
    }
}
function handlePostUserRequest(req, res) {
    if (!(0, ServerUtils_1.isAuthorized)(req, [ServerData_1.Roles.ADMIN, ServerData_1.Roles.CUSTOMER_SUPPORT])) {
        (0, ServerUtils_1.send4xxResponse)(res, 401);
        return;
    }
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });
    req.on("end", () => {
        try {
            const requestBody = JSON.parse(body);
            let id = requestBody.id;
            let status = ServerData_1.KycStatus[requestBody.kycStatus];
            if (!status) {
                (0, ServerUtils_1.send4xxResponse)(res, 400, `Invalid kycStatus: ${requestBody.kycStatus}`);
                return;
            }
            try {
                userService.updateUser(id, status);
            }
            catch (e) {
                if (e instanceof Error) {
                    (0, ServerUtils_1.send4xxResponse)(res, 400, e.message);
                    return;
                }
            }
            res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            res.end();
        }
        catch (e) {
            (0, ServerUtils_1.send4xxResponse)(res, 400);
        }
    });
}
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
