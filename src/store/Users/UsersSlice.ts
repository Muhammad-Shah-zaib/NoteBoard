import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginResponseDto, ISingUpResponseDto, IUserState, IVerifyEmailResponse } from "./types";
import { loginAsync, signUpAsync, verifyEmailAsync } from "./UsersApis";

// initial state
export const initialState: IUserState = {
    userDto: null,
    error: null,
    signUpSuccessMessage: null,
    loginStatus: false,
    incorrectEmail: false,
    loginPending: false,
}

// slice
export const notesSlice = createSlice({
    name: 'users',
    initialState,
    reducers: { 
        // reducer to change toggle login state
        updateLoginStatus: (state, action: PayloadAction<{status?: boolean}>) => {
            if (action.payload.status == undefined) {
                state.loginStatus = !state.loginStatus;
            }else {
                  state.loginStatus = action.payload.status;
            }
        }, 
    },
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
            .addCase(loginAsync.fulfilled, (state, {payload}: PayloadAction<ILoginResponseDto>)=> {
                state.loginPending = false;
                if (payload.statusCode === 500){
                    alert(payload.message);
                }
                if (payload.ok && payload.statusCode){
                    // we can new say user to verifyEmail
                    state.loginStatus = true;
                }
                if (!payload.ok && payload.statusCode === 404) {
                    state.incorrectEmail = true;                    
                }
                if (!payload.ok && payload.statusCode === 403) {
                    state.error = {
                        statusCode: 403,
                        message: payload.message,
                    }
                }
            }).addCase(loginAsync.pending, state => {
                state.loginPending = true;
            })
            
    }
})

export default notesSlice.reducer;

export const { updateLoginStatus } = notesSlice.actions;