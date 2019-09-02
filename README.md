# Heens Ordering App

[![CircleCI](https://circleci.com/gh/ayrbox/HeensOrderingApp.svg?style=svg)](https://circleci.com/gh/ayrbox/HeensOrderingApp)

Ordering web app for a restaurant. Basic features includes CRUD customer, menu with category and take order. The project

Build with `MERN` stack and `Docker`. Docker-compose files for `dev` and `prod` are included. Structured to be `monorepo` using `yarn workspace`.
`CircleCI` for continious integration. `Material-ui` used as react component library.

## Development

**Using Docker:**

```shell
$ git clone https://github.com/ayrbox/HeensOrderingApp.git

$ docker-compose -f docker-compose.dev.yml up -d
```
This will start the application in dev environment inside docker container.

**Local:**

```shell
$ git clone https://github.com/ayrbox/HeensOrderingApp.git

$ yarn install

$ yarn develop
```

Starts application in dev environment running locally. Requied MongoDb connection and use mongodb from `docker-compose.yml` before running `yarn develop`.

```shell
$ docker-compose up mongodb -d
```

`yarn develop` runs api and app script using `concurrently`. Api (`express`) runs at port 5000 and webapp (`react`) at port 3000. Proxy url is setup on react app which routes to api running at port 5000.

> Note:  
> On production `yarn start`, the static react app is served via root router or an api.

## Seeding Data 
```shell
$ docker-compose run --rm orderingapp seed  # for prod env

$ docker-compose run --rm api seed # for dev env

$ yarn workspace api run develop  # for runing locally
```

## Author Note 

Personally, I have used this project to learn about docker, node, mongo, project management, testing, jest, mocha, chai, api test, express, material-ui, react, thunk and everything that being used in this project. It has gone through lots of iteration and big structural changes. FYI, it did not started as mono-repo. App is far from production quality. However, if somebody want to use it or want to extend it please feel free to fork and I am more than happy to assist without any liability. Please read the license for more detail.

## License

MIT Licence
