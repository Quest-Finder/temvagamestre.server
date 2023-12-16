FROM node:18.10.0-slim

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm  install

RUN npm run  build

EXPOSE 3000

CMD ["npm ","run", "start:prod"]  