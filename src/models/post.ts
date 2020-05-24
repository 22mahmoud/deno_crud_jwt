import { IPost, IUser } from "../types.ts";
import { PostgresClient } from "../../deps.ts";
import { dbClient } from "../db.ts";

class PostModel {
  private dbClient: PostgresClient;

  constructor(dbClient: PostgresClient) {
    this.dbClient = dbClient;
  }

  async insert(
    data: Omit<IPost, "user"> & { userId: string }
  ): Promise<Omit<IPost, "user"> | null> {
    try {
      await this.dbClient.connect();
      const text =
        "insert into posts (id, title, body, user_id) values ($1, $2, $3, $4) returning id, title, body";
      const result = await this.dbClient.query({
        text,
        args: [data.id, data.title, data.body, data.userId]
      });
      await this.dbClient.end();

      return result.rowsOfObjects()[0] as Omit<IPost, "user">;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.dbClient.connect();
      const text = "delete from posts where posts.id = $1";
      await this.dbClient.query({
        text,
        args: [id]
      });
      await this.dbClient.end();
      return true;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Partial<IPost>[]> {
    try {
      await this.dbClient.connect();
      const text = `
        select posts.id as id, title, body, user_id, users.name as user_name
        from posts 
        inner join users on users.id = posts.user_id;`;
      const result = await this.dbClient.query({
        text
      });
      await this.dbClient.end();
      return result.rowsOfObjects().map(({ user_id, user_name, ...rest }) => ({
        ...rest,
        user: {
          id: user_id as string,
          name: user_name as string
        }
      }));
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string): Promise<Partial<IPost>> {
    try {
      await this.dbClient.connect();
      const text = `
        select posts.id as id, title, body, user_id, users.name as user_name
        from posts 
        inner join users on users.id = posts.user_id
        where posts.id = $1;`;
      const result = await this.dbClient.query({
        text,
        args: [id]
      });
      await this.dbClient.end();
      return result.rowsOfObjects().map(({ user_id, user_name, ...rest }) => ({
        ...rest,
        user: {
          id: user_id as string,
          name: user_name as string
        }
      }))[0];
    } catch (error) {
      throw error;
    }
  }
}

export const Post = new PostModel(dbClient);
