#!/usr/bin/env node

const shell = require('shelljs');

shell.echo('Tearing down build for compose stack...');
shell.exec('docker-compose -f docker-compose.yml down -v');
