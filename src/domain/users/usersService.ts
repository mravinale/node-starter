import { IUserDto, UserDto } from "./userDto";
import { singleton } from 'tsyringe';

@singleton()
export class UsersService {
    public get(id: number, name?: string): IUserDto {
        return new UserDto( {
            email: "jane@doe.com",
            name: name ?? "Jane Doe",
            phone: "Happy",
            skype: "123123",
        });
    }

    public create(user: IUserDto): IUserDto {
        return user ;
    }
}
