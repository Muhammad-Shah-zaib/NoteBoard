import { bindActionCreators } from '@reduxjs/toolkit';
import {
    addWhiteboardAsync,
    updateWhiteboard,
} from '../store/whiteboard/whiteboardApis.ts';
import { AppDispatch, RootState } from '../store/store.ts';
import { connect } from 'react-redux';
import CreateWhiteboard from '../components/Whiteboard/CreateWhiteboard.tsx';

const mapStateToProps = (state: RootState) => ({
    loading: state.whiteboardSlice.fetchingWhiteboards,
    currentWhiteboard: state.whiteboardSlice.currentWhiteboard,
});

type TMapDispatchToProps = (dispatch: AppDispatch) => {
    addWhiteboardAsync: typeof addWhiteboardAsync;
    updateWhiteboard: typeof updateWhiteboard;
};
const mapDispatchToProps: TMapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            addWhiteboardAsync,
            updateWhiteboard,
        },
        dispatch,
    );
};

const CreateWhiteboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateWhiteboard);

export default CreateWhiteboardContainer;
