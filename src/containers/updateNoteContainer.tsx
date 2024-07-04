import { AppDispatch } from '../store/store.ts';
import { updateNoteAsync } from '../store/Notes/notesApis.ts';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import UpdateNote from '../components/Notes/UpdateNote.tsx';

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

const UpdateNoteContainer = connect(null, mapDispatchToProps)(UpdateNote);
export default UpdateNoteContainer;
