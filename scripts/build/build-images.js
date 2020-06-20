#!/usr/bin/env node

require('dotenv').config();

const shell = require('shelljs');

shell.exec('yarn image:build:base');
shell.exec('yarn image:build:tundera');
shell.exec('yarn image:build:website');

shell.exec(`TAG=${VERSION_TAG} yarn image:tag:dockerhub:base`);
shell.exec(`TAG=${VERSION_TAG} yarn image:tag:dockerhub:nextjs`);
shell.exec(`TAG=${VERSION_TAG} yarn image:tag:dockerhub:website`);

shell.exec(`TAG=${VERSION_TAG} yarn image:tag:gcloud:base`);
shell.exec(`TAG=${VERSION_TAG} yarn image:tag:gcloud:nextjs`);
shell.exec(`TAG=${VERSION_TAG} yarn image:tag:gcloud:website`);

shell.exec(`TAG=${VERSION_TAG} yarn image:push:dockerhub:base`);
shell.exec(`TAG=${VERSION_TAG} yarn image:push:dockerhub:nextjs`);
shell.exec(`TAG=${VERSION_TAG} yarn image:push:dockerhub:website`);

shell.exec(`TAG=${VERSION_TAG} yarn image:push:gcloud:base`);
shell.exec(`TAG=${VERSION_TAG} yarn image:push:gcloud:nextjs`);
shell.exec(`TAG=${VERSION_TAG} yarn image:push:gcloud:website`);

shell.exec(
    `TAG=${VERSION_TAG} envsubst < containers/k8s/resources/deployments/lunar-nextjs-deployment.yaml | kubectl apply -f -`
);
