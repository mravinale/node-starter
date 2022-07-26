export interface IUserDto {
    name?: string;
    email?: string;
    phone?: string;
    skype?: string;
}

export class UserDto implements IUserDto {
    public email?: string;
    public name?: string;
    public phone?: string;
    public skype?: string;

    constructor(args: IUserDto) {
        Object.assign(this, args);
    }
}
