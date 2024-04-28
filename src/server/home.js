import { getTemplate } from "../utils/get-template.js";
import { DatabaseService } from "../libsql/database-service.js";

const stateLabels = [
  "Idea",
  "Preparation",
  "Developing",
  "Testing",
  "Completed",
];

export default async function Home(req, res) {
  const projects = await DatabaseService.getAllProjects();
  const projectsWithState = projects.map((project) => ({
    ...project,
    stateLabel: stateLabels[project.state],
  }));
  const nonCompletedProjects = projectsWithState.filter(
    (project) => project.state < 4
  );
  const completedProjects = projectsWithState.filter(
    (project) => project.state === 4
  );
  const nonCompletedProjectsSorted = nonCompletedProjects.sort(
    (a, b) => b.state - a.state
  );
  const html = await getTemplate("home.ejs", {
    projects: [...nonCompletedProjectsSorted, ...completedProjects],
  });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}
