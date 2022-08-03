import { Body, Controller, Query, Delete, Put, Get, Post, Route, Response, SuccessResponse } from "tsoa";
import { IUserDto } from "./userDto";
import { IPaginationDto, PaginationDto } from "../../utils/PaginationDto";
import { UsersService } from "./usersService";
import { injectable } from 'tsyringe';

@injectable()
@Route("users")
export class UsersController extends Controller {
    constructor(private usersService: UsersService) {
        super();
    }

    @Get("{id}")
    public async get( id: string ): Promise<IUserDto> {
        return this.usersService.get(id);
    }

    @Get()
    public async getPaginated(
        @Query("page") page: number,
        @Query("limit") limit: number,
        @Query("sort") sort?: string,
        @Query("field") field?: string,
        @Query("filter") filter?: string
    ): Promise<IPaginationDto> {
        return this.usersService.getPaginated(new PaginationDto({ page, limit, sort, field, filter }));
    }

    @Response(400, "Bad request")
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async create(@Body() body: IUserDto): Promise<IUserDto> {
        return this.usersService.create(body);
    }

    @Response(400, "Bad request")
    @Put("{id}")
    public async update(id: string, @Body() body: IUserDto): Promise<IUserDto> {
        return this.usersService.update(id, body);
    }

    @Delete("{id}")
    public async delete(id: string): Promise<string> {
        return this.usersService.delete(id);
    }
}
