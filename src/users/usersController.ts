import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
} from "tsoa";
import { User } from "./user";
import { UsersService, UserCreationParams } from "./usersService";
import { injectable } from 'tsyringe';

@injectable()
@Route("users")
export class UsersController extends Controller {
    constructor(private usersService: UsersService) {
        super();
    }

    @Get("{userId}")
    public async getUser(
        @Path() userId: number,
        @Query() name?: string
    ): Promise<User> {
        return this.usersService.get(userId, name);
    }

    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<void> {
        this.setStatus(201); // set return status 201
        this.usersService.create(requestBody);
        return;
    }
}
