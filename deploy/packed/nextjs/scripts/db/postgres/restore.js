#!/usr/bin/env node

const shell = require('shelljs');

shell.echo(`Restoring postgres db in container ${process.env.POSTGRES_CONATINER}...`)
shell.exec(
  `pg_restore --verbose --clean --no-acl --no-owner -h ${process.env.POSTGRES_HOST} -U ${process.env.POSTGRES_USER} -d ${process.env.POSTGRES_DB} backup/${process.env.POSTGRES_DUMP}`,
);