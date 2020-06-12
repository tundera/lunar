#!/usr/bin/env node

const shell = require('shelljs');

shell.echo(
  `Connecting to postgres database \'${process.env.POSTGRES_DB}\' at http://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
);
shell.exec(
  `docker exec -it ${process.env.POSTGRES_CONTAINER} psql -U ${process.env.POSTGRES_USER} -a ${process.env.POSTGRES_DB}`
);
