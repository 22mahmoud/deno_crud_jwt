import { Schema } from "https://deno.land/x/nessie/mod.ts";

export const up = (schema: Schema): void => {
  schema.create("users", table => {
    table.uuid("id").primary();
    table.text("name").notNullable();
    table
      .text("email")
      .notNullable()
      .unique();
    table.text("password").notNullable();
  });
};

export const down = (schema: Schema): void => {
  schema.drop("users");
};
