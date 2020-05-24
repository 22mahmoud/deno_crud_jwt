import { Config } from "./types.ts";
import { ConnectionOptions } from "../deps.ts";

const dbConfig: ConnectionOptions = {
  hostname: Deno.env.get("DB_HOST"),
  port: +Deno.env.get("DB_PORT")!,
  user: Deno.env.get("DB_USER"),
  database: Deno.env.get("DB_DATABASE"),
  password: Deno.env.get("DB_PASSWORD")
};

export const config: Config = {
  dbConfig,
  jwtSecret: Deno.env.get("JWT_SECRET")!
};
