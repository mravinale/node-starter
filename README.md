# Node Starter


## Start application

 * start with dev database `yarn start:dev`
 * start with local database `yarn start:local dbname={dbname} dbusername={dbusername} dbpassword={dbpassword}`

# tsoa api
* This project is a seed for building a **node.js** api. It includes the following features:
* * [tsoa](https://www.npmjs.com/package/tsoa) `typescript`
* * [inversify](https://www.npmjs.com/package/inversify) `inversion of controll / dependency injection`
* * [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
* * [typeorm](https://www.npmjs.com/package/typeorm) `SQL ORM`
* * [mocha](https://www.npmjs.com/package/mocha), [chai](https://www.npmjs.com/package/chai), [supertest](https://www.npmjs.com/package/supertest), [sinon](https://www.npmjs.com/package/sinon) `unit and integration testing`

## Swagger
* `<url>/api-docs`

## Commands
* **instalation:** `yarn install`
* **dev:** `yarn start` *build tsoa routes, swagger definitions and starts the server on development mode listening to file changes (swagger definition changes will require a manual restart)*
* **test:** `yarn test` *unit and integration tests*
* **build:** `yarn build` *production build*
* **prod:** `yarn start:prod` *starts the server on production mode*
* **local:** `yarn start:local` *lets the user sets the database via arguments*
   * **required arguments:**
      * **dbname=LOCAL_DBNAME**
      * **dbusername=LOCAL_USERNAME**
      * **dbpassword=LOCAL_PASSWORD**
  * **default arguments (can be overriden):**
      * **dbhost=localhost**
      * **dbport=3306**
      * **dbdialect=postgres**

## Scaffolding
* config `express server, DB connection, Logger, etc`
  * env `.env files`
* controllers `routes configuration`
* persistance `data abstraction layers`
  * Entities `classes and interfaces representing entities.`
* services `business logic to be used primary by controllers`
  * Dtos `Data transfer objects, to decouple domain from Rest resources`
* utils
* tests

## Docker 
* [Base Image](phusion/baseimage:0.10.0) `phusion/baseimage`
* [Process Manager for Nodejs](http://pm2.keymetrics.io/) `PM2`

