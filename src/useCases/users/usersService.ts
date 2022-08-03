import { IUserDto } from "./userDto";
import { singleton } from 'tsyringe';
import { PaginationDto } from "../../utils/PaginationDto";
import "reflect-metadata";
import { UsersRepository } from "./usersRepository";

@singleton()
export class UsersService {

    constructor(private usersRepository: UsersRepository) {
    }

    public async get(id: string): Promise<IUserDto> {
        return await this.usersRepository.get(id);
    }

    public async getPaginated(pageDto: PaginationDto): Promise<PaginationDto> {
         return await this.usersRepository.getPaginated(pageDto);
    }

    public create(user: IUserDto): Promise<IUserDto> {
        return this.usersRepository.create(user);
    }

    public async delete(id: string): Promise<string> {
        return await this.usersRepository.delete(id);
    }

    public async update(id: string, user: IUserDto): Promise<IUserDto> {
        return await this.usersRepository.update(id, user);
    }

}
