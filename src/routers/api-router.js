import projects from "../server/api/projects.js";
import project from "../server/api/project.js";
import login from "../server/api/login.js";
import getCookie from "../utils/get-cookie.js";
import { LoginService } from "../libsql/login-service.js";

export default async function apiRouter(req, res) {
  const reqURL = req.url.replace("/api", "");

  const cookies = req.headers["cookie"];

  if (cookies) {
    const loginCookie = getCookie(cookies, "login");
    if (!loginCookie) {
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end("401 Unauthorized");
      return;
    }
    const isVerify = await LoginService.verifyCookie(loginCookie);
    if (!isVerify) {
      return login(req, res);
    }
    try {
      switch (reqURL) {
        case "/":
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "API Home" }));
          break;
        case new RegExp("/projects/?$").test(reqURL) && reqURL:
          projects(req, res);
          break;
        case new RegExp("/projects/([a-zA-Z0-9-]+)/?$").test(reqURL) && reqURL:
          project(req, res);
          break;
        case new RegExp("/login/?$").test(reqURL) && reqURL:
          login(req, res);
          break;
        default:
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
      }
    } catch (error) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(JSON.stringify({ error: "Data was not sent correctly" }));
    }
  } else {
    if (new RegExp("/login/?$").test(reqURL)) {
      return login(req, res);
    } else {
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end("401 Unauthorized");
      return;
    }
  }
}
