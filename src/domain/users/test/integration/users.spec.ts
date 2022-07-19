import { expect } from 'chai';
import supertest from 'supertest';

import { app } from "../../../../app";
const entityName: string = 'user';

describe(`users`, () => {

  const server = supertest(app);

  describe('GET /{id}', () => {
    it(`should get one: ${entityName}`, async () => {
      const id = 2;
      const res = await server.get(`/users/${id}`);
      expect(res.status).to.equal(200);
      expect(res.body.id).to.deep.equal(id);
    });

    it(`should FAIL to get one: ${entityName}`, async () => {
      const res = await server.get(`/users/aaaaa`);
      expect(res.status).to.satisfy((val: number) => val === 400 || val === 404 || val === 500);
    });
  });
});
