export default function apiRouter(req, res) {
  const reqURL = req.url.replace("/api", "");
  switch (reqURL) {
    case "/":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ users: [] }));
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
  }
}
