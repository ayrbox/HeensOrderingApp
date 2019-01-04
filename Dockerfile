FROM node:latest

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY . . 

RUN npm install --prefix client

RUN npm run build --prefix client

RUN npm install

EXPOSE 5000

ENTRYPOINT ["sh", "./bin/docker-entrypoint.sh"]
