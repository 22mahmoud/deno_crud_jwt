import { Migration, Schema, dbDialects } from "../deps.ts";

const dialect: dbDialects = "pg";

export const up: Migration = () => {
  let query = new Schema(dialect).create("users", (table) => {
    table.uuid("id").primary();
    table.text("name").notNullable();
    table.text("email").notNullable().unique();
    table.text("password").notNullable();
  });

  return query;
};

export const down: Migration = () => {
  return new Schema(dialect).drop("users");
};
