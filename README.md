# Simple application

This application is created using React, Node.js (NestJS framework) and uses PostgreSQL as DBMS.

React runs as separate application and it is actually SPA.
NestJS runs as API provider.
PostgreSQL runs from `docker-compose` for development and demo convenience.
Yarn was chosen as package manager.

## Installation

###### Each command block, independent of step, assumes you are running it from project root.

1. Install packages for both server and client

```bash
$ cd ./server
$ yarn install
```

```bash
$ cd ./client
$ yarn install
```

2. Fill up env variables for database, server and client.

###### Note: Client's env variables needed here just for convenient managing. They are still included in resulting bundle. No need to change them after the copy from `.env.example`. Also make sure you define `proxy` in client's `package.json` the same as your actual server url

You can leave database env variables as it is. Default user has name `postgres`, password `postgres` and it creates database `nest-react`.

Database (PostgreSQL)
```bash
$ cd ./server
$ cp .env.db.example .env.db
```

Server
```bash
$ cd ./server
$ cp .env.example .env
```
Default port exposed from docker container with PostgreSQL is `35432`, set it in `./server/.env` for `DB_PORT`

Client
```bash
$ cd ./client
$ cp .env.example .env
```

3. Run database

```bash
$ docker-compose up
```

###### Note: You should have the same env variables for database `user`, `password` and `database name` for both databse and server.

4. Run migrations

```bash
$ cd ./server
$ yarn typeorm:cli migration:run
```

5. Start server

```bash
$ cd ./server
$ yarn start:dev
```

6. Start client

```bash
$ cd ./client
$ yarn start
```

7. Go to localhost link for UI. Default port is `3000`.

## Migrations

For NestJS and TypeORM binding, it was designed a separate wrapper-command for working with typeorm cli.

Run

```bash
$ yarn typeorm:cli migration:run
```

Revert

```bash
$ yarn typeorm:cli migration:revert
```

## Swagger

After running server, you are able to access Swagger UI by going to the localhost and port specified `/api`
Swagger API root can be adjusted in env variable for server `(./server/.env)`
