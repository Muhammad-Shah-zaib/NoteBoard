import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserState, IVerifyEmailResponse } from "./types";
import { VERIFY_EMAIL_ENDPOINT } from "../../environment/environment";
import { IRequestOptopns } from "../whiteboard/types";

// ACTIONS
export const VERIFY_EMAIL: string = 'users/verifyEmail';

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