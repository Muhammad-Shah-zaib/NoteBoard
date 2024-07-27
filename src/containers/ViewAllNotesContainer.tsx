import { AppDispatch, RootState } from '../store/store.ts';
import { connect } from 'react-redux';
import ViewAllNotes from '../components/Notes/ViewAllNotes.tsx';
import { bindActionCreators } from '@reduxjs/toolkit';
import { updateCurrentNote } from '../store/Notes/NotesSlice.ts';
import { deleteNoteById } from '../store/Notes/notesApis.ts';
import { ISingleNote } from '../store/Notes/types.ts';
import { IUserDto } from '../store/Users/types.ts';

type TMapStateToProps = (state: RootState) => {
    notes: ISingleNote[];
    userDto: IUserDto;
};
type TMapDispatchToProps = (dispatch: AppDispatch) => {
    updateCurrentNote: typeof updateCurrentNote;
    deleteNoteById: typeof deleteNoteById;
};

export type TViewAllNotesProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const mapStateToProps: TMapStateToProps = (state: RootState) => ({
    notes: state.notesSlice.notes,
    userDto: state.usersSlice.userDto!,
});
const mapDispatchToProps: TMapDispatchToProps = (dispatch: AppDispatch) => {
    return bindActionCreators(
        {
            updateCurrentNote,
            deleteNoteById,
        },
        dispatch,
    );
};

const ViewAllNotesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ViewAllNotes);

export default ViewAllNotesContainer;
