import fs from "node:fs/promises";
import ejs from "ejs";
import path from "node:path";

export async function getTemplate(file, data) {
  const projectRoot = process.cwd();
  const ejsFilePath = path.resolve(projectRoot, "src", "templates", file);
  const ejsFile = await fs.readFile(ejsFilePath, "utf-8");
  const html = ejs.render(ejsFile, { title: "Home" });
  return html;
}
