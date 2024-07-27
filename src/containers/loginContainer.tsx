import { bindActionCreators } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store/store';
import { loginAsync } from '../store/Users/UsersApis';
import { connect } from 'react-redux';
import Login from '../shared/pages/login';
import { updateLoginStatus } from '../store/Users/UsersSlice';
import { IErrorDto } from '../store/Users/types';

type TMapStateToProps = (state: RootState) => {
    loginStatus: boolean;
    loginPending: boolean;
    incorrectEmail: boolean;
    error: IErrorDto | null;
};

type TMapDispatchToProps = (dispatch: AppDispatch) => {
    loginAsync: typeof loginAsync;
    updateLoginStatus: typeof updateLoginStatus;
};

const mapStateToProps: TMapStateToProps = (state) => ({
    loginStatus: state.usersSlice.loginStatus,
    incorrectEmail: state.usersSlice.incorrectEmail,
    loginPending: state.usersSlice.loginPending,
    error: state.usersSlice.error,
});

const mapDispatchToProps: TMapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            loginAsync,
            updateLoginStatus,
        },
        dispatch,
    );

export type TLoginProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
