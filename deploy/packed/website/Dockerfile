FROM us.gcr.io/tundera-276902/tundera-base:latest

WORKDIR /app/website

RUN addgroup -S node && adduser -S node -G node
USER node

RUN printenv

ENTRYPOINT [ "yarn", "start" ]

###############################################################################