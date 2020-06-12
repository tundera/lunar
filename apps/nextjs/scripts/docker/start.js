#!/usr/bin/env node

const shell = require('shelljs');

shell.echo('Starting compose stack...');
shell.exec('docker-compose -f docker-compose.yml up -d');
