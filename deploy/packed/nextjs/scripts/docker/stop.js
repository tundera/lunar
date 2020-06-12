#!/usr/bin/env node

const shell = require('shelljs');

shell.echo('Stopping compose stack...');
shell.exec('docker-compose -f docker-compose.yml stop');
