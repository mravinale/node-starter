import { expect } from "chai";

import "reflect-metadata";
import * as ioc from "../../../../config/ioc";
import { UsersService } from "../../usersService";
import { container } from "tsyringe";
import { DbConnection } from "../../../../config/dbConnection";

/** we need some of this stuff on runtime */
ioc; // tslint:disable-line

describe("UsersService", () => {
  let service: UsersService;

  before(async () => {
    const dbConnection = container.resolve(DbConnection);
    await dbConnection.initializeDbConnection();
    service = container.resolve(UsersService)
  });

  it("should getById", async () => {
    const res = await service.get("25cc1ce1-a933-4b04-a256-23b4ca13274b");
    expect(res).to.have.property("name");
  });

});
