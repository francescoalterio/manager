import Home from "../server/home.js";

export default function uiRouter(req, res) {
  switch (req.url) {
    case "/":
      Home(req, res);
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
  }
}
