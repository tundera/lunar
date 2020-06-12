#!/usr/bin/env node

const shell = require('shelljs');

shell.echo(
  `Copying query \'${process.env.POSTGRES_POPULATE}\' to postgres database \'${process.env.POSTGRES_DB}\'`,
);
shell.exec(
  `docker cp sql/${process.env.POSTGRES_POPULATE} ${process.env.POSTGRES_CONTAINER}:sql/${process.env.POSTGRES_POPULATE}`,
);
shell.exec(
  `docker exec -it ${process.env.POSTGRES_CONTAINER} psql -U ${process.env.POSTGRES_USER} -a ${process.env.POSTGRES_DB} -f sql/${process.env.POSTGRES_POPULATE}`,
);
