import mimeTypes from "mime-types";
import { getPublicFile } from "../utils/get-public-file.js";
import Home from "../server/home.js";

export default function uiRouter(req, res) {
  switch (req.url) {
    case "/":
      Home(req, res);
      break;
    case req.url.startsWith("/public/") ? req.url : false:
      const file = req.url.replace("/public/", "");
      getPublicFile(file).then((data) => {
        if (data) {
          const mimeType = mimeTypes.lookup(file);
          res.writeHead(200, { "Content-Type": mimeType });
          res.end(data);
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
        }
      });
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
  }
}
