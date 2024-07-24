import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISingUpResponseDto, IUserState, IVerifyEmailResponse } from "./types";
import { signUpAsync, verifyEmailAsync } from "./UsersApis";

// initial state
export const initialState: IUserState = {
    userDto: null,
    error: null,
    signUpSuccessMessage: null
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
            })
            .addCase(signUpAsync.fulfilled, (state, {payload}: PayloadAction<ISingUpResponseDto>)=>{
                // FOR 200 RESPONSE
                if (payload.ok && payload.statusCode === 200){
                    state.signUpSuccessMessage = payload.message;
                }else {
                    state.error = {
                        message: payload.message,
                        statusCode: payload.statusCode,
                    };
                }
            })
            .addCase(signUpAsync.rejected, (_, action)=> {
                console.log(action);
            })
            
    }
})

export default notesSlice.reducer;
