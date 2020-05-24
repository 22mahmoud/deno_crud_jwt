import { PostgresClient } from "../deps.ts";
import { config } from "./config.ts";

export const dbClient = new PostgresClient(config.dbConfig);
