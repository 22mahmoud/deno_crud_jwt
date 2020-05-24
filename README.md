# Deno crud Api + jwt

A simple boilerplate for Deno CRUD Api, with jwt authentication.

### Features

- [x] simple CRUD operations.
- [x] [Oak](https://github.com/oakserver/oak) framework.
- [x] [deno-postgres](https://github.com/buildondata/deno-postgres) as postgres deriver
- [x] [jwt](https://github.com/timonson/djwt) and [deno-bcrypt](https://github.com/JamesBroadberry/deno-bcrypt) for authentication.
- [ ] handle all errors
- [ ] tests
- [x] deno-nessie for database migrations.
- [ ] Docker
- [ ] github actions (CI)

### Prerequisites

- Deno v1.
- Postgres

### Getting Started

```bash
git clone https://github.com/22mahmoud/deno_crud_jwt.git

cd deno_crud_jwt

cp .env.example .env
```

before run the server fill .env values.

```bash
# download & cache all deps
deno cache ./deps.ts

# migrate database after fill your env file
deno run --allow-net --allow-read --allow-env https://deno.land/x/nessie/cli.ts migrate

# run the server
deno run --allow-net --allow-env --allow-read src/index.ts
```
