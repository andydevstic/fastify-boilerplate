FROM --platform=arm64 node:16

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install && yarn build

CMD ["npm", "start"]