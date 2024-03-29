# node-starter

## Start application
 
* Install dependencies `yarn install`
* Start with local project `yarn dev`

## Tech Stack
### This project is a seed for building a **node.js** api. It includes the following features:
  * [tsoa](https://www.npmjs.com/package/tsoa) `integrated OpenAPI compiler framework`
  * [tsyringe](https://www.npmjs.com/package/tsyringe) `inversion of control / dependency injection`
  * [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) `auto-generated swagger-ui generated API docs from express`
  * [mocha](https://www.npmjs.com/package/mocha), [chai](https://www.npmjs.com/package/chai), [supertest](https://www.npmjs.com/package/supertest), [ts-mockito](https://github.com/NagRock/ts-mockito#readme) `unit and integration testing tools`
  * [typeorm](https://www.npmjs.com/package/typeorm) `SQL ORM`

## Where can I find the API Swagger documentation ?
* `<url>/docs`

## Which is the endpoint URL?
* `<url>`

## Commands
* **installation:** `yarn install` *download dependencies*
* **test:** `yarn test` *unit and integration tests*
* **build:** `yarn build` *production build*
* **dev:** `yarn dev` *starts the server on development mode*
* **local** `yarn local` *starts the server with nodemon locally*

## CI/CD
### Currently Github Actions workflows is implemented for CI/CD

#### Workflow Summary: 
* Tests run(unit and integration tests).
* Creates new [Docker](https://www.docker.com/) image.
* Pushes new docker version into [AWS ECR](https://aws.amazon.com/ecr/).
* Deploys new version into [AWS ECS](https://aws.amazon.com/ecs/) Cluster.

## Download latest docker image
* https://gallery.ecr.aws/b1x7g5t5/node-starter

