# node-starter-v2

[![node-starter](https://github.com/mravinale/node-starter-v2/actions/workflows/aws-ecs.yml/badge.svg)](https://github.com/mravinale/node-starter-v2/actions/workflows/aws-ecs.yml)

## Start application
 
* Install dependencies `yarn install`
* Start with local project `yarn local`

# Tech Stack
* This project is a seed for building a **node.js** api. It includes the following features:
* * [tsoa](https://www.npmjs.com/package/tsoa) `typescript`
* * [tsyringe](https://www.npmjs.com/package/tsyringe) `inversion of control / dependency injection`
* * [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) `auto-generated swagger-ui generated API docs from express`
* * [mocha](https://www.npmjs.com/package/mocha), [chai](https://www.npmjs.com/package/chai), [supertest](https://www.npmjs.com/package/supertest), [sinon](https://www.npmjs.com/package/sinon) `unit and integration testing`

## Where can I find the API Swagger documentation ?
* `<url>/docs`

## Which is the endpoint URL?
* `<url>`

## Commands
* **installation:** `yarn install`
* **test:** `yarn test` *unit and integration tests*
* **build:** `yarn build` *production build*
* **dev:** `yarn dev` *starts the server on development mode*
* **local** `yarn local` *lets start nodemon locally*

# CI/CD
Current Github Actions workflows is implemented for CI/CD

Workflow Summary
* Runs tests
* Creates new [Docker](https://www.docker.com/) image
* Pushes new docker version into [AWS ECR](https://aws.amazon.com/ecr/)
* Deploys new version into [AWS ECS](https://aws.amazon.com/ecs/) Cluster

# See it live deployed at ECS here:
* [http://ec2-54-87-32-205.compute-1.amazonaws.com/docs/](http://ec2-54-87-32-205.compute-1.amazonaws.com/docs/)

