FROM node:latest as builder

RUN mkdir /web

WORKDIR /usr/app

COPY package.json .
RUN npm install --quite

COPY . .
