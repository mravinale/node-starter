import { expect } from 'chai';
import supertest from 'supertest';

import { Server } from "../../../config/server";
import { UserDto } from "../userDto";
import { generateUserModel } from "../../../utils/Models";
const entityName: string = 'user';

describe(`Users Controller`, () => {

  let server;
  let app;
  let model;
  let dto;

  before(async () => {
    server = new Server();
    await server.start();
    app = supertest(server.app);
    model = generateUserModel();
    dto = new UserDto({name: model.name, email: model.email, phone: model.phone, skype: model.skype});
  });

  describe('POST /users', () => {
    it(`should crete one: ${entityName}`, async () => {
      const res = await app.post('/users').send(dto);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("id");
      model.id = res.body.id;
    });
  });

  describe('GET /users/{id}', () => {
    it(`should get one: ${entityName}`, async () => {

      const res = await app.get(`/users/${model.id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name");
    });

    it(`should FAIL to get one: ${entityName}`, async () => {
      const res = await app.get(`/users/aaaaa`);
      expect(res.status).to.satisfy((val: number) => val === 400 || val === 404 || val === 500);
    });
  });

  describe('DELETE /users/{id}', () => {
    it(`should delete one: ${entityName}`, async () => {
      const res = await app.delete(`/users/${model.id}`);

      expect(res.status).to.equal(200);
      expect(res.text).equals("1");
    });
  });
});
