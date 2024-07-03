"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send4xxResponse = exports.isAuthorized = exports.parseUrl = void 0;
const ServerData_1 = require("./ServerData");
function parseUrl(url) {
    const [pathname, search] = url.split("?");
    const searchParams = new Map();
    if (search) {
        const params = search.split("&");
        for (const param of params) {
            const [key, value] = param.split("=");
            searchParams.set(key, value);
        }
    }
    return { pathname, searchParams };
}
exports.parseUrl = parseUrl;
function isAuthorized(req, requiredRoles) {
    let authToken = req.headers.authorization;
    if (!authToken) {
        return false;
    }
    if (requiredRoles.length === 0) {
        return true;
    }
    let operator = (0, ServerData_1.getOperatorByToken)(authToken);
    if (operator === undefined) {
        return false;
    }
    if (operator.accessToken.roles.some((role) => requiredRoles.includes(role))) {
        return true;
    }
    return false;
}
exports.isAuthorized = isAuthorized;
function send4xxResponse(res, code, message) {
    res.writeHead(code, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    let errorResponse;
    switch (code) {
        case 401:
            errorResponse = { message: "Unauthorised" };
            break;
        case 404:
            errorResponse = { message: "Resource Not Found" };
            break;
        default:
            errorResponse = {
                message: `Invalid request${message ? `: ${message}` : ""}`,
            };
            break;
    }
    res.end(JSON.stringify(errorResponse));
    return;
}
exports.send4xxResponse = send4xxResponse;
