# Deno crud Api + jwt

A simple boilerplate for Deno CRUD Api, with jwt authentication.

### Features

- [x] simple CRUD operations.
- [x] [Oak](https://github.com/oakserver/oak) framework.
- [x] [deno-postgres](https://github.com/buildondata/deno-postgres) as postgres deriver
- [x] [jwt](https://github.com/timonson/djwt) and [deno-bcrypt](https://github.com/JamesBroadberry/deno-bcrypt) for authentication.
- [x] handle all errors
- [x] using [yup](https://github.com/jquense/yup) for body data validation using [pika.dev](https://www.pika.dev/)
- [ ] tests
- [x] [deno-nessie](https://github.com/halvardssm/deno-nessie) for database migrations.
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
deno run --allow-net --allow-env --allow-read --unstable src/index.ts
```
