import { bindActionCreators } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store/store";
import { IErrorDto, IUserDto } from "../store/Users/types";
import { verifyEmailAsync } from "../store/Users/UsersApis";
import EmailVerification from "../shared/pages/EmailVerification";
import { connect } from "react-redux";

type TMapStateToProps = (state: RootState) => {
    userDto: IUserDto | null;
    error: IErrorDto | null;
};

const mapStateToProps: TMapStateToProps = state => ({
    userDto: state.usersSlice.userDto,
    error: state.usersSlice.error
})

type TMapDispatchToProps = (dispatch:AppDispatch) => {
    verifyEmailAsync: (emailVerificationToken: string) => void;
};
const mapDistpatchToProps: TMapDispatchToProps = dispatch => {
    return bindActionCreators({
        verifyEmailAsync,
    }, dispatch);
}


export type TEmailVerificationProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDistpatchToProps>;
const EmailVerificationContainer = connect(mapStateToProps, mapDistpatchToProps)(EmailVerification);
export default EmailVerificationContainer;