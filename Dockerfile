FROM node:latest

RUN mkdir /web

WORKDIR /web

COPY package.json .
RUN npm install --quite

COPY . .
