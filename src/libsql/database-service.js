import client from "./client.js";
import crypto from "node:crypto";

export class DatabaseService {
  static async getAllProjects() {
    const result = await client.execute("SELECT * FROM projects");
    return result.rows;
  }

  static async addProject({ name, description, state, type }) {
    const id = crypto.randomUUID();
    console.log(id);
    return await client.execute({
      sql: "INSERT INTO projects (id, name, description, state, type) VALUES (:id, :name, :description, :state, :type)",
      args: {
        id,
        name,
        description,
        state,
        type,
      },
    });
  }
  static async deleteProject(id) {
    return await client.execute({
      sql: "DELETE FROM projects WHERE id = :id",
      args: {
        id,
      },
    });
  }
  static async updateProject({ id, name, description, state, type }) {
    return await client.execute({
      sql: "UPDATE projects SET name = :name, description = :description, state = :state, type = :type WHERE id = :id",
      args: {
        id,
        name,
        description,
        state,
        type,
      },
    });
  }
  static async getProject(id) {
    const result = await client.execute({
      sql: "SELECT * FROM projects WHERE id = :id",
      args: {
        id,
      },
    });
    return result.rows[0];
  }
  static async updateProjectState(id, state) {
    return await client.execute({
      sql: "UPDATE projects SET state = :state WHERE id = :id",
      args: {
        id,
        state,
      },
    });
  }
}
