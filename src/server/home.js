import { getTemplate } from "../utils/get-template.js";

export default async function Home(req, res) {
  const html = await getTemplate("home.ejs", { title: "Home" });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}
