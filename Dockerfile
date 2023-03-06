# Specify a base image
FROM hmctspublic.azurecr.io/base/node:14-alpine as base

COPY --chown=hmcts:hmcts . .

## ---- Build image ----
FROM base as build
RUN yarn && yarn cache clean

## ---- Runtime image ----
COPY . ./src/main

# Uses port which is used by the actual application
EXPOSE 3000

# Default command
CMD ["yarn", "run", "start"]



#15:31:57  Status: Downloaded newer image for hmctspublic.azurecr.io/base/node:14-alpine
#15:31:57   ---> c2c13077eb9a
#15:31:57  Step 2/5 : WORKDIR /app
#15:31:57   ---> Running in ad74c5ebcb26
#15:31:57  Removing intermediate container ad74c5ebcb26
#15:31:57   ---> 5f86cf5b6ac8
#15:31:57  Step 3/5 : COPY --chown=hmcts:hmcts . .
#15:31:57   ---> 5b6146ce3a9d
#15:31:57  Step 4/5 : RUN yarn
#15:31:57   ---> Running in ca89adb5d16a


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
