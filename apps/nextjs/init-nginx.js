#!/usr/bin/env node

const shell = require('shelljs');

shell.exec('rm -f ./nginx/certs/*');

shell.echo('==================================================');
shell.echo('Installing local CA in system trust store');
shell.echo('==================================================');

shell.exec('mkcert -install');

shell.echo('==================================================');
shell.echo('Creating certificate for localhost');
shell.echo('==================================================');

shell.exec(
  'mkcert -cert-file ./nginx/certs/localhost.pem -key-file ./nginx/certs/localhost-key.pem -ecdsa localhost "*.localhost" 127.0.0.1 ::1'
);

shell.echo('Done!');
