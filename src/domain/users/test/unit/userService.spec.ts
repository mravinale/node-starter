import { expect } from "chai";

import "reflect-metadata";
import * as ioc from "../../../../config/ioc";
import { UsersService } from "../../usersService";
import { container } from "tsyringe";

/** we need some of this stuff on runtime */
ioc; // tslint:disable-line

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(() => {
    service = container.resolve(UsersService)
  });

  it("should getById", async () => {
    const res = await service.get(12);
    expect(res).to.have.property("id");
  });

});
