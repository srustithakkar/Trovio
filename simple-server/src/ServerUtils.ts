import { IncomingMessage, ServerResponse } from "http";
import { Roles, getOperatorByToken } from "./ServerData";

function parseUrl(url: string) {
  const [pathname, search] = url.split("?");
  const searchParams = new Map<string, string>();

  if (search) {
    const params = search.split("&");

    for (const param of params) {
      const [key, value] = param.split("=");
      searchParams.set(key, value);
    }
  }

  return { pathname, searchParams };
}

function isAuthorized(req: IncomingMessage, requiredRoles: Roles[]): boolean {
  let authToken = req.headers.authorization;
  if (!authToken) {
    return false;
  }

  if (requiredRoles.length === 0) {
    return true;
  }

  let operator = getOperatorByToken(authToken);
  if (operator === undefined) {
    return false;
  }

  if (operator.accessToken.roles.some((role) => requiredRoles.includes(role))) {
    return true;
  }

  return false;
}

interface ErrorResponse {
  message: string;
}

function send4xxResponse(res: ServerResponse, code: number, message?: string) {
  res.writeHead(code, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  let errorResponse: ErrorResponse;

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

export { parseUrl, isAuthorized, send4xxResponse };
