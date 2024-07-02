import { createCaseAsync } from '../store/Notes/notesApis.ts';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../store/store.ts';
import { IAddNoteRequestDto } from '../store/Notes/types.ts';
import CreateNotes from '../components/Notes/CreateNotes.tsx';

type TMapDispatchToProps = (dispatch: AppDispatch) => {
    createCaseAsync: (requestData: IAddNoteRequestDto) => void;
};

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.notesSlice.fetchingNotes,
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
