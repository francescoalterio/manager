import apiRouter from "./routers/api-router.js";
import uiRouter from "./routers/ui-router.js";

export default function Router(req, res) {
  switch (req.url) {
    case req.url.startsWith("/api/") ? req.url : false:
      apiRouter(req, res);
      break;
    default:
      uiRouter(req, res);
      break;
  }
}
