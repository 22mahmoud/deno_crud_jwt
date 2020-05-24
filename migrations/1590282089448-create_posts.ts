import { Schema } from "https://deno.land/x/nessie/mod.ts";

export const up = (schema: Schema): void => {
  schema.create("posts", table => {
    table.uuid("id").primary();
    table.text("title").notNullable();
    table.text("body").notNullable();
    table.uuid("user_id").notNullable();
    table.custom("foreign key (user_id) references users");
  });
};

export const down = (schema: Schema): void => {
  schema.drop("posts");
};
