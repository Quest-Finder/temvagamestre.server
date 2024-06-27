FROM node:18.10.0-slim as build 

WORKDIR /home/node/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:18.10.0-slim as production

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install --ignore-scripts

COPY  --from=build /home/node/app/dist /app

ENTRYPOINT [ "node", "/app/main/main.js" ]
