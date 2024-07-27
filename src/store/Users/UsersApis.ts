import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginResponseDto, ISignUpRequestDto, ISingUpResponseDto, IUserState, IVerifyEmailResponse } from "./types";
import { LOGIN_ENDPOINT, SINGUP_ENDPOINT, VERIFY_EMAIL_ENDPOINT } from "../../environment/environment";
import { IRequestOptions } from "../whiteboard/types";
// ACTIONS
export const VERIFY_EMAIL: string = 'users/verifyEmail';
export const SIGN_UP: string = 'users/signUp';
export const LOGIN: string = 'users/login';
export const LOGIN_VERIFCATION = 'users/verifyLogin';

// TO VERIFY EMAIL
export const verifyEmailAsync = createAsyncThunk<
    IVerifyEmailResponse,
    string,
    { state: IUserState }
>(
    VERIFY_EMAIL,
    async (token: string) => {
        console.log('token', token);
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
const verifyLoginAsync = createAsyncThunk<
    ILoginResponseDto,
    {token: string},
    {state: IUserState}
>(
    LOGIN_VERIFCATION,
    async ({ token }) => {
        // VERIFY-LOGIN IS A GET REQUEST SO NO NEED FOR REQUEST OPTIONS

        // fetch call
        const response = await fetch(LOGIN_ENDPOINT + token);

        return await response.json();
    }
)