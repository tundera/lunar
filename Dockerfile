FROM node:13 AS base

# RUN apk add --no-cache libc6-compat ca-certificates
#RUN apk add --no-cache make g++ python
WORKDIR /app

COPY package.json /app/
COPY lerna.json /app/

# Add all configs relevant to the build step
COPY babel.config.js .
COPY tsconfig.json .

COPY website website
COPY services services
COPY packages packages
COPY apps apps
COPY scripts scripts

###############################################################################

FROM base AS builder

WORKDIR /app

# Specify cache directory for yarn
RUN mkdir -p .caches/yarn/local
RUN mkdir -p .caches/yarn/global

RUN yarn config set cache-folder .caches/yarn/local
RUN yarn config set global-folder .cache/yarn/global

# Install yarn packages
RUN yarn --frozen-lockfile
RUN npx lerna init && npx lerna bootstrap

# Monorepo build
RUN yarn build

###############################################################################

FROM mhart/alpine-node:13

WORKDIR /app

# Copy build output and runtime deps from previous stage
COPY --from=builder /app/.caches .caches
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/website website
COPY --from=builder /app/services/express services/express
COPY --from=builder /app/apps/nextjs apps/nextjs
COPY --from=builder /app/packages/components packages/components

RUN yarn config set cache-folder .caches/yarn/local
RUN yarn config set global-folder .cache/yarn/global

RUN printenv

###############################################################################
