FROM node:20-slim
USER node
WORKDIR /usr/src/applause
COPY --chown=node:node . .
RUN yarn install \
    && yarn build \
    && rm -rf node_modules \
    && yarn install --production
ENV NODE_ENV=production
CMD [ "yarn", "start" ]
