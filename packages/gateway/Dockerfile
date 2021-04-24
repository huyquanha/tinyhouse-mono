# To be run from the root context (.), otherwise can't copy yarn.lock over
# Used -f to specify the Dockerfile to be run ./packages/gateway/Dockerfile
FROM node:12-alpine as build

WORKDIR /app

# specific version doesn't work for some reason, 
# has to specify "berry" which means yarn version in the image can change => not good
# ENV YARN_VERSION 2.4.1
# RUN yarn set version $YARN_VERSION

# this seems to solve the problem by pinning the version to what is under the .yarn/releases folder
COPY package.json yarn.lock .yarnrc.yml tsconfig.json .
COPY .yarn/releases .yarn/releases
COPY .yarn/plugins .yarn/plugins
COPY packages/gateway/package.json ./packages/gateway/
COPY packages/utils/package.json ./packages/utils/

# including dev dependencies like typescript, so we can build
# `yarn workspaces focus` only install dependencies for the specified workspace
# and any workspaces it depends on
RUN yarn workspaces focus @tinyhouse/gateway

COPY packages/gateway ./packages/gateway
COPY packages/utils ./packages/utils

RUN yarn workspace @tinyhouse/gateway run build

# Build production image from the build layer above
FROM node:12-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock /app/.yarnrc.yml .
COPY --from=build /app/.yarn .yarn
COPY --from=build /app/packages/gateway/package.json ./packages/gateway/
COPY --from=build /app/packages/utils/package.json ./packages/utils/

# you could also specify NODE_ENV=production instead of using this flag
RUN yarn workspaces focus --production @tinyhouse/gateway

COPY --from=build /app/packages/gateway/build ./packages/gateway/build
COPY --from=build /app/packages/utils/build ./packages/utils/build
CMD [ "yarn", "workspace", "@tinyhouse/gateway", "start" ]