import { createCaseAsync } from '../store/Notes/notesApis.ts';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../store/store.ts';
import CreateNotes from '../components/Notes/CreateNotes.tsx';
import { IUserDto } from '../store/Users/types.ts';

type TMapStateToProps = (state: RootState) => {
    loading: boolean;
    userDto: IUserDto;
};
type TMapDispatchToProps = (dispatch: AppDispatch) => {
    createCaseAsync: typeof createCaseAsync;
};
export type TCreateNotesProps = ReturnType<TMapDispatchToProps> &
    ReturnType<TMapStateToProps>;
const mapStateToProps: TMapStateToProps = (state: RootState) => {
    return {
        loading: state.notesSlice.fetchingNotes,
        userDto: state.usersSlice.userDto!,
    };
};

const mapDispatchToProps: TMapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            createCaseAsync,
        },
        dispatch,
    );
};

const CreateNotesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateNotes);
export default CreateNotesContainer;
