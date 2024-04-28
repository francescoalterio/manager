import { DatabaseService } from "../../libsql/database-service.js";

export default async function project(req, res) {
  const id = req.url.split("/")[3];
  switch (req.method) {
    case "GET":
      if (id) {
        res.writeHead(200, { "Content-Type": "application/json" });
        const project = await DatabaseService.getProject(id);
        res.end(JSON.stringify(project));
        break;
      }
    case "DELETE":
      console.log("DELETE");
      await DatabaseService.deleteProject(id);
      res.writeHead(204);
      res.end();
      break;
    case "PATCH":
      console.log("PAAATCH");
      let bodyPATCH = "";
      req.on("data", (chunk) => {
        bodyPATCH += chunk.toString();
      });
      req.on("end", async () => {
        const data = JSON.parse(bodyPATCH);
        if (!data.state) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Missing state" }));
          return;
        }
        const project = await DatabaseService.getProject(id);
        console.log({ data, project });
        if (
          (project.state === 0 && data.state === -1) ||
          (project.state === 4 && data.state === 1)
        ) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Invalid state" }));
          return;
        }
        console.log("BIEN");
        const newProject = await DatabaseService.updateProjectState(
          id,
          project.state + data.state
        );
        console.log(newProject);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      });
      break;
  }
}
