#!/usr/bin/env node

const shell = require('shelljs');

shell.echo(`Invoking \"${process.env.POSTGRES_SERVICE}\" in docker-compose stack...`)
shell.exec(
  `docker exec -it $(docker-compose ps -q ${process.env.POSTGRES_SERVICE}) psql -U ${process.env.POSTGRES_USER} -a ${process.env.POSTGRES_DB}`,
);
