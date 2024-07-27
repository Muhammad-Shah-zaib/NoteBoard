import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginResponseDto, ISingUpResponseDto, IUserDto, IUserState, IVerifyEmailResponse } from "./types";
import { loginAsync, signUpAsync, verifyEmailAsync, verifyLoginAsync } from "./UsersApis";

// initial state
export const initialState: IUserState = {
    userDto: null,
    error: null,
    signUpSuccessMessage: null,
    loginStatus: false,
    incorrectEmail: false,
    loginPending: false,
    loginVerificationPending: false,
    loginVerifiedStatus: false,
}

// slice
export const usersSlice = createSlice({
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
        updateUserDto: (state, { payload: {userDto}}: PayloadAction<{userDto: IUserDto}>) => {
            state.userDto = userDto;
            console.log(userDto);
        }
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
            }).addCase(verifyLoginAsync.fulfilled, (state, {payload}: PayloadAction<ILoginResponseDto>)=> {
                state.loginVerificationPending = false;                   
                // if the token is valid
                if (payload.ok && payload.statusCode === 200) {
                    state.userDto = payload.user;
                    state.loginVerifiedStatus = true;
                    localStorage.setItem('userDto', JSON.stringify(payload.user) );
                }
                // if token is not valid
                else if(!payload.ok && payload.statusCode === 404) {
                    state.loginVerifiedStatus = false;
                    state.error = {
                        statusCode: 404,
                        message: "Invalid token"
                    }
                } 
            }).addCase(verifyLoginAsync.pending, state => {
                state.loginVerificationPending = true;
            })
    }
})

export default usersSlice.reducer;

export const { updateLoginStatus, updateUserDto } = usersSlice.actions;