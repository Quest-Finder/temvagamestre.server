FROM node:18.10.0-slim

WORKDIR /usr/app

COPY package.json package-lock.json ./

RUN npm install

RUN npm run build

COPY . .


CMD [ "npm", "run""start:prod" ]