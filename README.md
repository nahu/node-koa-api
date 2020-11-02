# Users - Code Challenge

## Database

Lets assume that we have an already installed postgres database, optionally with a dedicated user like **code-challenge**, you can use the script `create-role.sql` in the `/db` directory.

To create the role `code-challenge` with psql:

```bash
psql -U postgres -f db/create-role.sql
```

### Create Postgres Database

There must be a postgres database **code-challenge** owned by the user which credentials will be stored in the configuration file `config.json`. You can use the script `create-db.sql` in the `/db` directory to create the database.

To create the database with psql:

```bash
psql -U code-challenge -d postgres -f db/create-db.sql
```

### Install the sequelize command line tool

In addition, you will need to also install `sequelize` module **localy** in order to utilize the command line tool. Ref: https://github.com/sequelize/cli or you can use `npx` like `npx sequerlize ...`.

```
$ yarn global add sequelize-cli
```

### Configuring the connection

Create a copy of the file `config/config.example.json` to `config/config.json`.
Edit your development settings in `config/config.json` to point to your postgres database.

**Example `config/config.json`**

```
{
  "development": {
    "username": <your db username>,
    "password": <your db password>,
    "database": "code-challenge",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false,
    "logging": false <delete this to log to the console>
  },
  ...
}
```

### Run migrations

```
$ sequelize db:migrate
```

or

```
$ yarn migrate
```

### Seeding the database

```
$ sequelize db:seed:all
```

or

```
$ yarn seed
```
