import { notesSelector } from '../store/Notes/NotesSlice.ts';
import { connect } from 'react-redux';
import SavedNotes from '../shared/components/SideBar/SavedNotes.tsx';
import { AppDispatch, RootState } from '../store/store.ts';
import { updateCurrentNote } from '../store/Notes/NotesSlice.ts';
import { ActionCreatorWithPayload, bindActionCreators } from '@reduxjs/toolkit';
import { ISingleNote } from '../store/Notes/types.ts';
import { fetchNotesById, createCaseAsync } from '../store/Notes/notesApis.ts';

const mapStateToProps = (state: RootState) => ({
    notes: notesSelector(state),
});

type TMapDispatchToProps = (dispatch: AppDispatch) => {
    updateCurrentNote: ActionCreatorWithPayload<ISingleNote, string>;
    fetchNotesById: (id: number) => void;
};
const mapDispatchToProps: TMapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateCurrentNote,
            fetchNotesById,
            createCaseAsync,
        },
        dispatch,
    );

const SavedNotesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SavedNotes);

export default SavedNotesContainer;
