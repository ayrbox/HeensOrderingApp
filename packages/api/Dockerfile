FROM node:10.10

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY ./package.json .

RUN yarn install

COPY ./bin/ ./bin
COPY ./config/ ./config

EXPOSE 5000

CMD ["yarn", "develop"]
