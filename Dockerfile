FROM node:lts

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN yarn install

RUN yarn build

ENV NODE_ENV=development

EXPOSE 3000

CMD ["yarn", "start:prod"]  