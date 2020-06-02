import { nessieConfig, ClientPostgreSQL } from "./deps.ts";
import { config } from "./src/config.ts";

const configPg: nessieConfig = {
  client: new ClientPostgreSQL("./migrations", {
    ...config.dbConfig,
  }),
};

export default configPg;
