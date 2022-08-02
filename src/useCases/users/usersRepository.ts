import { IUserDto } from "./userDto";
import { singleton } from 'tsyringe';
import { DbConnection } from "../../config/dbConnection";
import { User } from "../../domain/entities/User";
import { PaginationDto } from "../../utils/PaginationDto";
import "reflect-metadata";

@singleton()
export class UsersRepository {

    constructor(private dbConnection: DbConnection) {
        this.userRepository  = this.dbConnection.datasource.getRepository(User);
    }

    public async get(id: string): Promise<IUserDto> {
        return await this.userRepository.findOneBy({id});
    }

    public async getPaginated(args: any): Promise<PaginationDto> {
        const isNil = val => val == null

        let page = args.page >= 0 ? args.page : 0;
        let filter =  isNil(args.filter) ? "%" : "%" + args.filter + "%";
        let field =  isNil(args.field) ? "name" : args.field;
        let sort = args.sort ? args.sort.toUpperCase() : "ASC";

        const count = await this.userRepository
            .createQueryBuilder('user')
            .where(`${field} like :filter`, { filter: filter })
            .select('DISTINCT(`id`)')
            .getCount();

        let data = await this.userRepository
            .createQueryBuilder("user")
            .skip(page * args.limit) // pagination starts at page 0
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

    public create(entity: IUserDto): Promise<IUserDto> {
        const user = this.userRepository.create(entity);
        return this.userRepository.save(user);
    }

    public async delete(id: string): Promise<string> {
      let result = await this.userRepository.delete(id);
      return result.affected;
    }

    public async update(id: string, entity: IUserDto): Promise<IUserDto> {
        const fieldsToUpdate = JSON.parse(JSON.stringify(entity));

        await this.userRepository.update(id, fieldsToUpdate);
        return await this.userRepository.findOneBy({id});
    }

    private userRepository;
}
