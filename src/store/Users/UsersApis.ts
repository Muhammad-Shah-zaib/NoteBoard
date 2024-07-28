import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginResponseDto, ISignUpRequestDto, ISingUpResponseDto, IUserState, IVerifyCredentialsRequest, IVerifyCredentialsResponse, IVerifyEmailResponse } from "./types";
import { LOGIN_ENDPOINT, SINGUP_ENDPOINT, VERIFY_CREDENTIALS_ENDPOINT, VERIFY_EMAIL_ENDPOINT, VERIFY_LOGIN_ENDPOINT } from "../../environment/environment";
import { IRequestOptions } from "../whiteboard/types";
// ACTIONS
export const VERIFY_EMAIL: string = 'users/verifyEmail';
export const SIGN_UP: string = 'users/signUp';
export const LOGIN: string = 'users/login';
export const LOGIN_VERIFCATION = 'users/verifyLogin';
export const VERIFY_CREDENTIALS = 'users/verifyCredentials';

// TO VERIFY EMAIL
export const verifyEmailAsync = createAsyncThunk<
    IVerifyEmailResponse,
    string,
    { state: IUserState }
>(
    VERIFY_EMAIL,
    async (token: string) => {
        // request options
        const requestOptions: IRequestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }

        // fetch call
        const response = await fetch(VERIFY_EMAIL_ENDPOINT + token, requestOptions);
        

        return await response.json();
    }
);

// TO SIGN UP
export const signUpAsync = createAsyncThunk<
    ISingUpResponseDto,    
    ISignUpRequestDto,
    {state: IUserState}
>(
    SIGN_UP,
    async (userDto) => {
        // request options
        const requestOptions: IRequestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDto)
        }

        // fetch call
        const response = await fetch(SINGUP_ENDPOINT, requestOptions);

        return await response.json();
    }
);

// login async thunk
export const loginAsync = createAsyncThunk<
    ILoginResponseDto,
    {email: string},
    {state: IUserState}
>(
    LOGIN,
    async ( requestDto )=> {
        // request options
        const requestOptions: IRequestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestDto)
        }

        // fetch call
        const response = await fetch(LOGIN_ENDPOINT, requestOptions);

        return await response.json();
    }
)

// verify login async thunk
export const verifyLoginAsync = createAsyncThunk<
    ILoginResponseDto,
    {token: string},
    {state: IUserState}
>(
    LOGIN_VERIFCATION,
    async ({ token }) => {
        // VERIFY-LOGIN IS A GET REQUEST SO NO NEED FOR REQUEST OPTIONS
        // fetch call
        const response = await fetch(VERIFY_LOGIN_ENDPOINT + token);
    

        return await response.json();
    }
)

// TO VERIFY CREDENTIALS
export const verifyCredentialsAsync = createAsyncThunk<
    IVerifyCredentialsResponse,
    IVerifyCredentialsRequest,
    {state: IUserState}
>(
    VERIFY_CREDENTIALS,
    async (requestDto )=> {
        console.log("-----------------");
        console.log(requestDto);
        // request options
        const requestOptions: IRequestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestDto)
        }

        // fetch call
        const response = await fetch(VERIFY_CREDENTIALS_ENDPOINT, requestOptions);

        return await response.json();
    }
)