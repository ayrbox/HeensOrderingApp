# Heens Ordering App

Demo: Ordering web app for a Heens Restaurant.


## Development

Run project for development.

```shell
$ git clone https://github.com/ayrbox/HeensOrderingApp.git

$ npm install

$ npm install --prefix client

$ npm run develop
```

`npm run develop` runs two script using `concurrently`. One for api (`express`) at port 5000 and another for webapp (`react`) at 3000. Proxy url is setup on react app which routes to api running at port 5000.

> Note:  
> On production `npm start`, the static react app is served via root router or an api.

## Docker Container

Run docker containers.

> Note: Container is for only production build. React app is not served via docker container.

```shell
docker-compose up
```

### Build container with Seed Data
```shell
$ docker-compose build

$ docker-compose run --rm webapp seed

$ docker-compse up
```
