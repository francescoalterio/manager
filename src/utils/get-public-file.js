import fs from "node:fs/promises";
import path from "node:path";

export async function getPublicFile(file) {
  const rootPath = process.cwd();
  try {
    const data = await fs.readFile(path.join(rootPath, "public", file));
    return data;
  } catch (error) {
    return false;
  }
}
