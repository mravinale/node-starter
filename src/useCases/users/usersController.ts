import { Body, Controller, Get, Post, Route, SuccessResponse } from "tsoa";
import { IUserDto } from "./userDto";
import { UsersService } from "./usersService";
import { injectable } from 'tsyringe';

@injectable()
@Route("users")
export class UsersController extends Controller {
    constructor(private usersService: UsersService) {
        super();
    }

    @Get("{userId}")
    public async getUser( userId: string ): Promise<IUserDto> {
        return this.usersService.get(userId);
    }

    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
        @Body() requestBody: IUserDto
    ): Promise<void> {
        this.setStatus(201); // set return status 201
        this.usersService.create(requestBody);
        return;
    }
}
