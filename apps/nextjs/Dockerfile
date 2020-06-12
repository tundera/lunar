FROM us.gcr.io/tundera-276902/tundera-base AS builder

WORKDIR /app/apps/nextjs

RUN addgroup -S node && adduser -S node -G node
USER node

RUN printenv

ENTRYPOINT [ "yarn", "start" ]

###############################################################################
