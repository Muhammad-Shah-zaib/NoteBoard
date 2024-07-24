import { bindActionCreators } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store/store";
import { IErrorDto, ISignUpRequestDto } from "../store/Users/types";
import { signUpAsync } from "../store/Users/UsersApis";
import { connect } from "react-redux";
import Signup from "../shared/pages/SIgnup";

type TMapStateToProps = (state: RootState) => {
    signUpSuccessMessage: string | null;
    error: IErrorDto | null;
}

type TMapDispatchToProps = (dispatch: AppDispatch) => {
    signUpAsync: (data: ISignUpRequestDto) => void;
}

const mapStateToProps: TMapStateToProps = state => ({
    signUpSuccessMessage: state.usersSlice.signUpSuccessMessage,
    error: state.usersSlice.error,
})
const mapDispatchToProps: TMapDispatchToProps = dispatch => {
    return bindActionCreators({
        signUpAsync,
    }, dispatch);
}

export type TSignupProps = ReturnType<TMapStateToProps> & ReturnType<TMapDispatchToProps>;

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default SignUpContainer;