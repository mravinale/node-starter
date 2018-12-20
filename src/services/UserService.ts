import { ProvideSingleton } from "../ioc";
import { BaseService } from "./BaseService";
import { IUserDto, PaginationDto } from "./dto";

import { getRepository } from "typeorm";
import { User } from "../persistance/entity/User";
import { isNullOrUndefined } from 'util';

@ProvideSingleton(UserService)
export class UserService extends BaseService<IUserDto> {
  private userRepository;

  constructor() {
    super();
    this.userRepository = getRepository(User);
  }

  public async getById(id: string): Promise<IUserDto> {
    return await this.userRepository.findOne(id);
  }

  public async create(entity: IUserDto): Promise<IUserDto> {
    const user = this.userRepository.create(entity);
    return this.userRepository.save(user);
  }

  public async getPaginated(args: any): Promise<PaginationDto> {

    let page = args.page >= 0 ? args.page : 0;
    let filter =  isNullOrUndefined(args.filter) ? "%" : "%" + args.filter + "%";
    let field =  isNullOrUndefined(args.field) ? "name" : args.field;
    let sort = args.sort ? args.sort.toUpperCase() : "ASC";

    const count = await this.userRepository
      .createQueryBuilder('user')
      .where(`${field} like :filter`, { filter: filter })
      .select('DISTINCT(`id`)')
      .getCount();

    let data = await this.userRepository
      .createQueryBuilder("article")
      .skip(page * args.limit)
      .take(args.limit)
      .where(`${field} like :filter`, { filter: filter })
      .orderBy(field, sort)
      .getMany();

    return new PaginationDto({
      count: count,
      page: page,
      limit: args.limit,
      sort: sort,
      filter: args.filter,
      totalPages: Math.ceil(count / args.limit),
      docs: data
    });
  }

  public async delete(id: string): Promise<string> {
    return await this.userRepository.delete(1);
  }

  public async update(id: string, entity: IUserDto): Promise<IUserDto> {
    const fieldsToUpdate = JSON.parse(JSON.stringify(entity));

    await this.userRepository.update(id, fieldsToUpdate);
    return await this.userRepository.findOne(id);
  }
}
