interface response {
    ok: boolean;
    statusCode: number;
    message: string;
    error: string[];
}

export interface IErrorDto {
    message: string;
    statusCode: number;
}

export interface IUserState {
    userDto : IUserDto | null;
    error: IErrorDto | null;
}

export interface IUserDto {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
}

export interface IVerifyEmailResponse extends  response {
    userDto: IUserDto;
}