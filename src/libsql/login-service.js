import client from "./client.js";
import crypto from "node:crypto";

export class LoginService {
  static async login(password, oldCookie) {
    if (password === process.env.ADMIN_PASSWORD) {
      if (oldCookie) {
        await client.execute({
          sql: "DELETE FROM sessions WHERE cookie = :cookie",
          args: {
            cookie: oldCookie,
          },
        });
      }
      const cookie = crypto.randomUUID();
      await client.execute({
        sql: "INSERT INTO sessions (cookie) VALUES (:cookie)",
        args: {
          cookie,
        },
      });

      return cookie;
    } else {
      throw new Error("Invalid password");
    }
  }

  static async verifyCookie(cookie) {
    const result = await client.execute({
      sql: "SELECT * FROM sessions WHERE cookie = :cookie",
      args: {
        cookie,
      },
    });
    console.log({ result });
    return result.rows.length > 0;
  }
}
