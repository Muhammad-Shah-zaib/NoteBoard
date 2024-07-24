import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISignUpRequestDto, ISingUpResponseDto, IUserState, IVerifyEmailResponse } from "./types";
import { SINGUP_ENDPOINT, VERIFY_EMAIL_ENDPOINT } from "../../environment/environment";
import { IRequestOptopns } from "../whiteboard/types";

// ACTIONS
export const VERIFY_EMAIL: string = 'users/verifyEmail';
export const SIGN_UP: string = 'users/signUp';

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
        const requestOptions: IRequestOptopns = {
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
        const requestOptions: IRequestOptopns = {
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
