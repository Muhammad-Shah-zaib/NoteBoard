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
    signUpSuccessMessage: string | null;
}
// INTERFACE FOR SINGLE USER DTO
export interface IUserDto {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
}

// INTERFACES FOR VERIFY EMAIL
export interface IVerifyEmailResponse extends  response {
    userDto: IUserDto;
}

// INTERFACES FOR SIGNUP
export interface ISingUpResponseDto extends response {
    userDto: IUserDto;
}

export interface ISignUpRequestDto extends IUserDto {}