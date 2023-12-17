FROM node:18.10.0-slim

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm  install

RUN npm run  build

ENV NODE_ENV=production

CMD ["npm","run", "start:prod"]  