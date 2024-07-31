import { notesSelector } from '../store/Notes/NotesSlice.ts';
import { connect } from 'react-redux';
import SavedNotes from '../shared/components/SideBar/SavedNotes.tsx';
import { AppDispatch, RootState } from '../store/store.ts';
import { updateCurrentNote } from '../store/Notes/NotesSlice.ts';
import { ActionCreatorWithPayload, bindActionCreators } from '@reduxjs/toolkit';
import { ISingleNote } from '../store/Notes/types.ts';
import {
    fetchNotesByUserId,
    createCaseAsync,
    fetchNoteById,
} from '../store/Notes/notesApis.ts';
import { IUserDto } from '../store/Users/types.ts';

type TMapStateToProps = (state: RootState) => {
    notes: ISingleNote[];
    userDto: IUserDto | null;
};

type TMapDispatchToProps = (dispatch: AppDispatch) => {
    updateCurrentNote: ActionCreatorWithPayload<ISingleNote, string>;
    createCaseAsync: typeof createCaseAsync;
    fetchNotesByUserId: typeof fetchNotesByUserId;
    fetchNoteById: typeof fetchNoteById;
};

export type TSavedNotesProps = ReturnType<TMapStateToProps> &
    ReturnType<TMapDispatchToProps>;

const mapStateToProps: TMapStateToProps = (state: RootState) => ({
    notes: notesSelector(state),
    userDto: state.usersSlice.userDto,
});

const mapDispatchToProps: TMapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            updateCurrentNote,
            fetchNotesByUserId,
            createCaseAsync,
            fetchNoteById,
        },
        dispatch,
    );
};

const SavedNotesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SavedNotes);

export default SavedNotesContainer;
