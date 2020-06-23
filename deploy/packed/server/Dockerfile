FROM mhart/alpine-node:13 AS baseImage

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn --production \
  --frozen-lockfile \
  --ignore-optional \
  --ignore-engines

RUN yarn clean cache

################################################################################
FROM baseImage AS builder

WORKDIR /app

RUN yarn build

################################################################################
FROM mhart/alpine-node:slim-13

WORKDIR /app
COPY --from=builder /app/dist ./dist

ENTRYPOINT [ "node", "-r", "dotenv-flow/config", "dist/express.cjs.prod.js" ]

