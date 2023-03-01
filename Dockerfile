# Specify a base image
FROM node:alpine

WORKDIR '/app'

# Install some depenendencies
COPY package.json .
RUN yarn install
COPY . .

# Uses port which is used by the actual application
EXPOSE 3000

# Default command
CMD ["yarn", "run", "start"]
#
#
## ---- Base image ----
#FROM hmctspublic.azurecr.io/base/node:14-alpine as base
#COPY --chown=hmcts:hmcts . .
#RUN yarn install --production \
#  && yarn cache clean
#
## ---- Build image ----
#FROM base as build
#RUN yarn install && yarn build:prod
#
## ---- Runtime image ----
#FROM base as runtime
#RUN rm -rf webpack/ webpack.config.js
#COPY --from=build $WORKDIR/src/main ./src/main
#
#EXPOSE 3300