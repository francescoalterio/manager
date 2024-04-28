import { DatabaseService } from "../../libsql/database-service.js";

export default async function projects(req, res) {
  switch (req.method) {
    case "GET":
      res.writeHead(200, { "Content-Type": "application/json" });
      const projects = await DatabaseService.getAllProjects();
      res.end(JSON.stringify(projects));
      break;
    case "POST":
      console.log("EEWEWE");
      let bodyPOST = "";
      req.on("data", (chunk) => {
        bodyPOST += chunk.toString();
      });
      req.on("end", async () => {
        const project = JSON.parse(bodyPOST);
        console.log("SI");
        await DatabaseService.addProject(project);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(project));
      });
      break;
    case "PUT":
      let bodyPUT = "";
      req.on("data", (chunk) => {
        bodyPUT += chunk.toString();
      });
      req.on("end", async () => {
        const project = JSON.parse(bodyPUT);
        await DatabaseService.updateProject(project);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(project));
      });
      break;
  }
}
