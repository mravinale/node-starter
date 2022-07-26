import { expect } from 'chai';
import supertest from 'supertest';

import { Server } from "../../../../config/server";
// import { generateUserModel } from "../../../../utils/Models";
const entityName: string = 'user';

describe(`users`, () => {

  let server;
  let app;
  // let model;

  before(async () => {
    server = new Server();
    await server.start();
    app = supertest(server.app);
  // model = generateUserModel();
  });

  describe('GET /{id}', () => {
    it(`should get one: ${entityName}`, async () => {
      let id = "25cc1ce1-a933-4b04-a256-23b4ca13274b";
      const res = await app.get(`/users/${id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name");
    });

    it(`should FAIL to get one: ${entityName}`, async () => {
      const res = await app.get(`/users/aaaaa`);
      expect(res.status).to.satisfy((val: number) => val === 400 || val === 404 || val === 500);
    });
  });
});
