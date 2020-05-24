import { config } from "./src/config.ts";

const configPg = {
  migrationFolder: `./migrations`,
  connection: config.dbConfig,
  dialect: "pg"
};

export default configPg;
