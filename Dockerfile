FROM node:18

ARG SERVICE=""

ENV SERVICE=${SERVICE}

RUN corepack enable

WORKDIR /home/node/app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm fetch

ADD . ./

RUN pnpm install -r --no-frozen-lockfile

RUN pnpm -F db build
RUN pnpm -F shared build
RUN pnpm -F ${SERVICE} build

RUN pnpm install -r --no-frozen-lockfile

RUN pnpm prune --prod

CMD ["/bin/bash", "./start.sh"]
