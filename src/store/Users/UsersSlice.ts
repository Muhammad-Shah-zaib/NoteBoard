import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState, IVerifyEmailResponse } from "./types";
import { verifyEmailAsync } from "./UsersApis";

// initial state
export const initialState: IUserState = {
    userDto: null,
    error: null,
}

// slice
export const notesSlice = createSlice({
    name: 'users',
    initialState,
    reducers: { },
    extraReducers: (builder)=> {
        builder
            .addCase(verifyEmailAsync.fulfilled, (state, {payload: {userDto, ok, statusCode, message}}: PayloadAction<IVerifyEmailResponse>) => {
                if (ok && statusCode === 200)
                    state.userDto = userDto;
                else {
                    state.error = {
                        message: message,
                        statusCode: statusCode,
                    };
                }
            });
    }
})

export default notesSlice.reducer;
