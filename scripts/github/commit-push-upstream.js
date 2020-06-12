#!/usr/bin/env node

const shell = require('shelljs');

shell.exec('git add . && git commit -m \"$MSG\" && git push');
shell.echo('Pushed upstream');