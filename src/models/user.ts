import { IUser } from "../types.ts";
import { PostgresClient, bcrypt } from "../deps.ts";
import { dbClient } from "../db.ts";

class UserModel {
  private dbClient: PostgresClient;

  constructor(dbClient: PostgresClient) {
    this.dbClient = dbClient;
  }

  private hashThePassowrd(password: string): string {
    return bcrypt.hashpw(password);
  }

  private beforeInsert(data: Omit<IUser, "id">): Omit<IUser, "id"> {
    const hashedPassword = this.hashThePassowrd(data.password);
    return {
      ...data,
      password: hashedPassword
    };
  }

  async insert(args: Omit<IUser, "id">): Promise<{ id: string }> {
    try {
      await this.dbClient.connect();
      const data = this.beforeInsert(args);
      const text =
        "insert into users (email, password, name) values ($1, $2, $3) returning id";
      const result = await this.dbClient.query({
        text,
        args: [data.email, data.password, data.name]
      });
      await this.dbClient.end();
      return { id: result.rows[0][0] };
    } catch (error) {
      throw error;
    }
  }

  private async get(type: string, value: string | number): Promise<IUser[]> {
    try {
      await this.dbClient.connect();
      const text = `select * from users where ${type} = $1`;
      const result = await this.dbClient.query({
        text,
        args: [value]
      });
      await this.dbClient.end();
      return result.rowsOfObjects() as IUser[];
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<Omit<IUser, "password"> | null> {
    try {
      const [result] = await this.get("email", email);
      if (!result) return null;

      return {
        id: result.id,
        email: result.email,
        name: result.name
      };
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string): Promise<Omit<IUser, "password"> | null> {
    try {
      const [result] = await this.get("id", id);
      if (!result) return null;

      return {
        id: result.id,
        email: result.email,
        name: result.name
      };
    } catch (error) {
      throw error;
    }
  }

  async comparePassword(
    email: string,
    password: string
  ): Promise<Omit<IUser, "password"> | null> {
    try {
      const [user] = await this.get("email", email);
      if (!user) return null;

      const result = bcrypt.checkpw(password, user.password);
      if (!result) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.name
      };
    } catch (error) {
      throw error;
    }
  }
}

export const User = new UserModel(dbClient);
