import { AppDispatch, RootState } from '../store/store.ts';
import { ISingleWhiteboard } from '../store/whiteboard/types.ts';
import { connect } from 'react-redux';
import ViewAllWhiteboards from '../components/Whiteboard/ViewAllWhiteboards.tsx';
import { bindActionCreators } from '@reduxjs/toolkit';
import { setCurrentWhiteboard } from '../store/whiteboard/whiteboardSlice.ts';
import { deleteWhiteboard } from '../store/whiteboard/whiteboardApis.ts';

// TYPES
type TMapStateToProps = (state: RootState) => {
    whiteboards: ISingleWhiteboard[];
};
type TMapDispatchToProps = (dispatch: AppDispatch) => {
    setCurrentWhiteboard: typeof setCurrentWhiteboard;
    deleteWhiteboard: typeof deleteWhiteboard;
};

// MAPPING STATE
const mapStateToProps: TMapStateToProps = (state) => ({
    whiteboards: state.whiteboardSlice.whiteboards,
});

// MAPPING DISPATCH
const mapDispatchToProps: TMapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            setCurrentWhiteboard,
            deleteWhiteboard,
        },
        dispatch,
    );
};

const ViewAllWhiteboardsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ViewAllWhiteboards);

export default ViewAllWhiteboardsContainer;
