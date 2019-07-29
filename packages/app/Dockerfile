FROM node:latest

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY ./package.json ./
RUN yarn install

COPY ./public/ ./public

EXPOSE 3000

CMD [ "yarn", "start" ]