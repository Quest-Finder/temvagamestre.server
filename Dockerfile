FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

FROM base as build 

WORKDIR /home/node/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM base as production

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install --omit=dev

COPY  --from=build /home/node/app/dist /app

RUN echo "npx prisma generate --schema /app/infra/database/prisma/schema/schema.prisma \
  && npx prisma migrate deploy --schema /app/infra/database/prisma/schema/schema.prisma \
  && node /app/infra/seeds/seed.js \
  && node /app/main.js" > run-server.sh

RUN chmod +x run-server.sh

CMD ["./run-server.sh"]

