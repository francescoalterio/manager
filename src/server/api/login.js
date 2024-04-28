import { LoginService } from "../../libsql/login-service.js";
import getCookie from "../../utils/get-cookie.js";

export default async function login(req, res) {
  console.log("LOGIN");
  switch (req.method) {
    case "POST":
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        try {
          const cookies = req.headers["cookie"];
          const bodyParsed = JSON.parse(body);
          if (!cookies) {
            const newCookie = await LoginService.login(bodyParsed.password);
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Set-Cookie": `login=${newCookie}; Max-Age=${
                10 * 365 * 24 * 60 * 60
              };Path=/`,
            });
            res.end();
          } else {
            const oldCookie = getCookie(cookies, "login");
            const newCookie = await LoginService.login(
              bodyParsed.password,
              oldCookie
            );
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Set-Cookie": `login=${newCookie}`,
            });
            res.end();
          }
        } catch (error) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end(JSON.stringify({ error: "Invalid password" }));
        }
      });
  }
}
