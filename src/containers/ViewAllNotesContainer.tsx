import { AppDispatch, RootState } from '../store/store.ts';
import { connect } from 'react-redux';
import ViewAllNotes from '../components/Notes/ViewAllNotes.tsx';
import { bindActionCreators } from '@reduxjs/toolkit';
import { updateCurrentNote } from '../store/Notes/NotesSlice.ts';

const mapStateToProps = (state: RootState) => ({
    notes: state.notesSlice.notes,
});
const mapDispatchToProps = (dispatch: AppDispatch) => {
    return bindActionCreators(
        {
            updateCurrentNote,
        },
        dispatch,
    );
};
const ViewAllNotesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ViewAllNotes);

export default ViewAllNotesContainer;
