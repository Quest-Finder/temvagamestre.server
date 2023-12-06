FROM node:lts

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm install

RUN npm run build

ENV NODE_ENV=development

EXPOSE 3000

CMD ["npm", "run" , "start:prod"]  