# Specify a base image
FROM hmctspublic.azurecr.io/base/node:18-alpine as base

COPY --chown=hmcts:hmcts . .
RUN yarn install && yarn cache clean

# Uses port which is used by the actual application
EXPOSE 3000

# Default command
CMD ["yarn", "run", "start"]
