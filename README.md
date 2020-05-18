# Deno crud Api + jwt

A simple boilerplate for Deno CRUD Api, with jwt authentication.

### Features

- [x] simple CRUD operations.
- [x] [Oak](https://github.com/oakserver/oak) framework.
- [x] [deno-postgres](https://github.com/buildondata/deno-postgres) as postgres deriver
- [x] [jwt](https://github.com/timonson/djwt) and [deno-bcrypt](https://github.com/JamesBroadberry/deno-bcrypt) for authentication.
- [ ] handle all errors 
- [ ] tests
- [ ] deno-nessie for database migrations.
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

before run the server fill .env valuse.

```bash
deno cache src/deps.ts
deno run --allow-net --allow-env --allow-read src/index.ts
```