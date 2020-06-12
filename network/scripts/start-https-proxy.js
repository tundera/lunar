#!/usr/bin/env node

require('dotenv').config();

const shell = require('shelljs');

shell.echo('Starting Caddy...');
shell.exec('./network/proxies/init-caddy.sh');
shell.exec('caddy run --config ./network/proxies/caddy/Caddyfile');
