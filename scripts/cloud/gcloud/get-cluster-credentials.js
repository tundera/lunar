#!/usr/bin/env node

const shell = require('shelljs');

const clusterName = process.env.GOOGLE_CLUSTER_NAME;
const projectId = process.env.GOOGLE_PROJECT_ID;
const computeZone = process.env.GOOGLE_COMPUTE_ZONE;

shell.echo(`Getting cluster credentials for cluster ${clusterName}`);
shell.exec(`gcloud --quiet config set project ${projectId}`);
shell.exec(`gcloud --quiet config set compute/zone ${computeZone}`);
shell.exec(`gcloud --quiet container clusters get-credentials ${clusterName}`);
