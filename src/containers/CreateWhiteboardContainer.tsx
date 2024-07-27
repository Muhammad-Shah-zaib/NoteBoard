import { bindActionCreators } from '@reduxjs/toolkit';
import {
    addWhiteboardAsync,
    updateWhiteboard,
} from '../store/whiteboard/whiteboardApis.ts';
import { AppDispatch, RootState } from '../store/store.ts';
import { connect } from 'react-redux';
import CreateWhiteboard from '../components/Whiteboard/CreateWhiteboard.tsx';

// TYPES
type TMapStateToProps = (state: RootState) => {
    loading: boolean;
    currentWhiteboard: any;
    userDto: any;
};
type TMapDispatchToProps = (dispatch: AppDispatch) => {
    addWhiteboardAsync: typeof addWhiteboardAsync;
    updateWhiteboard: typeof updateWhiteboard;
};

export type TCreateWhiteboardProps = ReturnType<TMapStateToProps> &
    ReturnType<TMapDispatchToProps>;

// MAPPINGS
const mapStateToProps: TMapStateToProps = (state: RootState) => ({
    loading: state.whiteboardSlice.fetchingWhiteboards,
    currentWhiteboard: state.whiteboardSlice.currentWhiteboard,
    userDto: state.usersSlice.userDto,
});
const mapDispatchToProps: TMapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            addWhiteboardAsync,
            updateWhiteboard,
        },
        dispatch,
    );
};

// CONTAINER
const CreateWhiteboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateWhiteboard);

export default CreateWhiteboardContainer;
