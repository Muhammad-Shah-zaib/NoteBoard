import { createCaseAsync } from '../store/Notes/notesApis.ts';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../store/store.ts';
import CreateNotes from '../components/Notes/CreateNotes.tsx';

type TMapDispatchToProps = (dispatch: AppDispatch) => {
    createCaseAsync: typeof createCaseAsync;
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
