import { AppDispatch, RootState } from '../store/store.ts';
import { updateNoteAsync } from '../store/Notes/notesApis.ts';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import UpdateNote from '../components/Notes/UpdateNote.tsx';
import { ISingleNote } from '../store/Notes/types.ts';

type TMapStateToProps = (state: RootState) => {
    currentNote: ISingleNote;
};
const mapStateToProps: TMapStateToProps = (state: RootState) => ({
    currentNote: state.notesSlice.currentNote!, // the click will only be available when there is some note already present
});

type TMapDispatchToProps = (dispatch: AppDispatch) => {
    updateNoteAsync: typeof updateNoteAsync;
};
const mapDispatchToProps: TMapDispatchToProps = (dispatch: AppDispatch) =>
    bindActionCreators(
        {
            updateNoteAsync,
        },
        dispatch,
    );

interface props {
    updateNoteAsync: typeof updateNoteAsync;
    currentNote: ISingleNote;
}
const UpdateNoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({ updateNoteAsync, currentNote }: props) => {
    // we need to fetch the note with the userId

    return (
        <UpdateNote
            updateNoteAsync={updateNoteAsync}
            currentNote={currentNote}
        />
    );
});

export default UpdateNoteContainer;
