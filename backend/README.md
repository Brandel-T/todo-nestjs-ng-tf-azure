<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <h1 align="center">Backend API | Fullstack ToDo</h1>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

![backend swagger api preview](/doc/be.png)

## Project setup

```bash
$ npm install
```

### Compile and run the project

Install docker if you don't have it on you PC , and run this command below to launch postgres db and backend app services:

```sh
docker compose up -d --build
```

### Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Code documentation

Open compodoc to get the code documentaiton. run the below command:

```sh
npx @compodoc/compodoc -p tsconfig.json -s
```

View the documentation in your browser under this address: http://127.0.0.1:8080.
