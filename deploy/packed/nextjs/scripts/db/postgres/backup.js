#!/usr/bin/env node

const shell = require('shelljs');

shell.echo(`Backing up postgres database \'${process.env.POSTGRES_DB}\' to \'sql/${process.env.POSTGRES_BACKUP}\' query...`);
shell.exec(
  `docker exec -it ${process.env.POSTGRES_CONTAINER} pg_dump -U ${process.env.POSTGRES_USER} --column-inserts --data-only ${process.env.POSTGRES_DB} > sql/${process.env.POSTGRES_BACKUP}`,
);
