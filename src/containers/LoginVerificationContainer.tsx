import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { IErrorDto, IUserDto } from '../store/Users/types';
import { verifyLoginAsync } from '../store/Users/UsersApis';
import LoginVerification from '../shared/pages/loginVerification';
import { bindActionCreators } from '@reduxjs/toolkit';

// TYPES
type TMapStateToProps = (state: RootState) => {
    userDto: IUserDto | null;
    error: IErrorDto | null;
    loginVerificationPending: boolean;
    loginVerifiedStatus: boolean;
};
type TMapDispatchToProps = (dispatch: AppDispatch) => {
    verifyLoginAsync: typeof verifyLoginAsync;
};

// Props
export type TLoginVerificationProps = ReturnType<TMapStateToProps> &
    ReturnType<TMapDispatchToProps>;

// MapStateToProps
const mapStateToProps: TMapStateToProps = (state: RootState) => ({
    userDto: state.usersSlice.userDto,
    error: state.usersSlice.error,
    loginVerificationPending: state.usersSlice.loginVerificationPending,
    loginVerifiedStatus: state.usersSlice.loginVerifiedStatus,
});

// MapDispatchToProps
const mapDispatchToProps: TMapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            verifyLoginAsync,
        },
        dispatch,
    );
};

// loginVerificationContainer
const LoginVerificationContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginVerification);

// export
export default LoginVerificationContainer;
