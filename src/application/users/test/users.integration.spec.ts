import { expect } from 'chai';
import supertest from 'supertest';

import { Server } from "../../../infrastructure/config/server";
import { UserDto } from "../userDto";
import { generateUserModel } from "../../../infrastructure/utils/Models";
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
    dto = new UserDto({
      name: model.name,
      email: model.email,
      phone: model.phone,
      skype: model.skype
    });
  });

  describe('POST /users', () => {
    it(`should crete one: ${entityName}`, async () => {

      // Act
      const res = await app.post('/users').send(dto);

      // Assert
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("id");

      // Save Id
      model.id = res.body.id;
    });
  });

  describe('GET /users/{id}', () => {
    it(`should get a user: ${entityName}`, async () => {

      // Act
      const res = await app.get(`/users/${model.id}`);

      // Assert
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name");
    });

    it(`should FAIL to get one: ${entityName}`, async () => {
      // Act
      const res = await app.get(`/users/aaaaa`);

      // Assert
      expect(res.status).to.satisfy((val: number) => val === 400 || val === 404 || val === 500);
    });
  });

  describe('GET /users', () => {
    it(`should get paginated user: ${entityName}`, async () => {

      // Act
      const res = await app.get(`/users?page=0&limit=10&sort=ASC&field=name&filter=${model.name}`);

      // Assert
      expect(res.body.docs[0].name).equals(model.name);
      expect(res.status).to.equal(200);
    });

    it(`should FAIL to get paginated one: ${entityName}`, async () => {

      // Act
      const res = await app.get(`/users?&sort=ASC&field=name&filter=${model.name}`);

      // Assert
      expect(res.status).to.satisfy((val: number) => val === 400);
      expect(res.res.text).to.satisfy(text => text.includes("validation error"))
    });

  });

  describe('DELETE /users/{id}', () => {
    it(`should delete one: ${entityName}`, async () => {

      // Act
      const res = await app.delete(`/users/${model.id}`);

      // Assert
      expect(res.status).to.equal(200);
      expect(res.text).equals("1");
    });
  });
});
