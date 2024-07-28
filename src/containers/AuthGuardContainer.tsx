import { connect } from 'react-redux';
import AuthGuard from '../guards/AuthGuard';
import { IErrorDto, IUserDto } from '../store/Users/types';
import { verifyCredentialsAsync } from '../store/Users/UsersApis';
import { updateUserDto } from '../store/Users/UsersSlice';
import { AppDispatch, RootState } from '../store/store';
import { bindActionCreators } from '@reduxjs/toolkit';

// TYPES
type TMapStateToProps = (state: RootState) => {
    userDto: IUserDto | null;
    authError: IErrorDto | null;
};

type TMapDispatchToProps = (dispatch: AppDispatch) => {
    updateUserDto: typeof updateUserDto;
    verifyCredentialsAsync: typeof verifyCredentialsAsync;
};

export type TAuthGuardProps = ReturnType<TMapStateToProps> &
    ReturnType<TMapDispatchToProps>;

// MAPPINGs
const mapStateToProps: TMapStateToProps = (state) => ({
    userDto: state.usersSlice.userDto,
    authError: state.usersSlice.authError,
});

const mapDispatchToProps: TMapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            updateUserDto: updateUserDto,
            verifyCredentialsAsync: verifyCredentialsAsync,
        },
        dispatch,
    );
};

// CONTAINER
const AuthGuardConatainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthGuard);

export default AuthGuardConatainer;
