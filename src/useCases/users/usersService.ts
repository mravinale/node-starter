import { IUserDto } from "./userDto";
import { singleton } from 'tsyringe';
import { DbConnection } from "../../config/dbConnection";
import { User } from "../../domain/entities/User";

@singleton()
export class UsersService {

    constructor(private dbConnection: DbConnection) {
        this.userRepository  = this.dbConnection.datasource.getRepository(User);
    }

    public async get(id: string): Promise<IUserDto> {
        return await this.userRepository.findOneBy({id});
    }

    public create(user: IUserDto): IUserDto {
        return user ;
    }
    private  userRepository;
}
