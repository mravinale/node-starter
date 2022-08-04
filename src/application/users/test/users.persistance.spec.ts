import "reflect-metadata";
import { expect } from "chai";
import { UsersRepository } from "../usersRepository";
import { container } from "tsyringe";
import { DbConnection } from "../../../infrastructure/config/dbConnection";
import { generateUserModel } from "../../../infrastructure/utils/Models";
import { PaginationDto } from "../../../infrastructure/utils/PaginationDto";

describe("Users Repository", () => {
  let repository: UsersRepository;
  let model = generateUserModel();

  before(async () => {
    const dbConnection = container.resolve(DbConnection);
    await dbConnection.initializeDbConnection();
    repository = container.resolve(UsersRepository)
  });

  it("should create user", async () => {
    // Act
    const user = await repository.create(model);

    // Assert
    expect(user).to.have.property("name");
  });

  it("should getById", async () => {
    // Act
    const res = await repository.get(model.id);

    // Assert
    expect(res).to.have.property("name");
  });

  it("should get paginated", async () => {

    // Arrange
    let dto = new PaginationDto({
      count: 0, docs: [], filter: "", sort: "", totalPages: 0,
      page: 0, limit: 10
    })

    // Act
    const user = await repository.getPaginated(dto);

    // Assert
    expect(user.docs.find(u => u.id === model.id)).to.have.property("name");

  });

  it("should update user", async () => {
    // Arrange
    model.name = "hello"

    // Act
    const user = await repository.update(model.id, model);

    // Assert
    expect(user.name).equals("hello")
  });

  it("should delete user", async () => {
     // Act
    const result = await repository.delete(model.id);

    // Assert
    expect(result).equals(1);
  });

});
