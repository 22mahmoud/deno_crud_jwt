const configPg = {
  migrationFolder: `./migrations`,
  connection: {
    database: "deno_crud",
    hostname: "localhost",
    port: 5432,
    user: "ashraf",
    password: "root"
  },
  dialect: "pg"
};

export default configPg;
