import { Server, IncomingMessage, ServerResponse, createServer } from "http";
import { KycStatus, LoginSuccessResponse, Roles, User, getOperatorByUserAndPassword } from "./ServerData";
import { UserService } from "./UserService";
import { isAuthorized, parseUrl, send4xxResponse } from "./ServerUtils";
import { CarbonService } from "./CarbonService";

const PORT = 8080;

const userService: UserService = new UserService();
const carbonService: CarbonService = new CarbonService();

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
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

    const { pathname, searchParams } = parseUrl(req.url || "");
    switch (pathname) {
      case "/api/login":
        handleLoginRequest(req, res);
        break;
      case "/api/projects":
        if (req.method === "GET") {
          handleGetProjectDetailsRequest(req, res);
        } else {
          send4xxResponse(res, 404);
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
        send4xxResponse(res, 404);
        return;
    }
});

function handleLoginRequest(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
                const requestBody: { username: string; password: string } = JSON.parse(body);

                let operator = getOperatorByUserAndPassword(requestBody.username, requestBody.password);

        if (operator) {
          let loginSuccessResponse: LoginSuccessResponse = {
            id: operator.id,
            username: operator.username,
            accessToken: operator.accessToken,
          };

          res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          res.end(JSON.stringify(loginSuccessResponse));
        } else {
          send4xxResponse(res, 401);
          return;
        }
      } catch (e) {
        send4xxResponse(res, 400);
      }
    });
  } else {
    send4xxResponse(res, 404);
    return;
  }
}

function handleGetProjectDetailsRequest(req: IncomingMessage, res: ServerResponse) {
  try {
    if (!isAuthorized(req, [])) {
      send4xxResponse(res, 401);
      return;
    }
    
    const projectDetails = carbonService.getCarbonProjectDetails();

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(projectDetails));
  } catch (e) {
    send4xxResponse(res, 400);
  }
}

function handleGetUserRequest(req: IncomingMessage, res: ServerResponse, queryParams: Map<string, string>) {
  try {
        if (!isAuthorized(req, [Roles.CUSTOMER_SUPPORT, Roles.ADMIN, Roles.AUDIT])) {
      send4xxResponse(res, 401);
      return;
    }

    let users: User[];
    const kycStatusParam = queryParams.get("kycStatus");

    if (kycStatusParam == null) {
      users = userService.getUsers();
    } else {
      let kycStatus = KycStatus[kycStatusParam as keyof typeof KycStatus];
      if (kycStatus === undefined) {
        send4xxResponse(res, 400, `Invalid kycStatus: ${kycStatusParam}`);
        return;
      }
      users = userService.getUsers(kycStatus);
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(users));
  } catch (e) {
    send4xxResponse(res, 400);
  }
}

function handlePostUserRequest(req: IncomingMessage, res: ServerResponse) {
  if (!isAuthorized(req, [Roles.ADMIN, Roles.CUSTOMER_SUPPORT])) {
    send4xxResponse(res, 401);
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const requestBody: {
        id: string;
        kycStatus: string;
      } = JSON.parse(body);

      let id = requestBody.id;
      let status = KycStatus[requestBody.kycStatus as keyof typeof KycStatus];
      if (!status) {
                send4xxResponse(res, 400, `Invalid kycStatus: ${requestBody.kycStatus}`);
        return;
      }

      try {
        userService.updateUser(id, status);
      } catch (e) {
        if (e instanceof Error) {
          send4xxResponse(res, 400, e.message);
          return;
        }
      }

      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end();
    } catch (e) {
      send4xxResponse(res, 400);
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
