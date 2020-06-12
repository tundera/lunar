#!/usr/bin/env node

const shell = require('shelljs');

shell.echo('${GCLOUD_SERVICE_KEY} > cloud/gcloud-service-key.json');
shell.exec('gcloud auth activate-service-account --key-file=cloud/gcloud-service-key.json');
