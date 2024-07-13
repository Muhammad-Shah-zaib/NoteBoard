import { AppDispatch, RootState } from '../store/store.ts';
import { ISingleWhiteboard } from '../store/whiteboard/types.ts';
import { bindActionCreators } from '@reduxjs/toolkit';
import { setCurrentWhiteboard } from '../store/whiteboard/whiteboardSlice.ts';
import { connect } from 'react-redux';
import SavedWhiteboards from '../shared/components/SideBar/SavedWhiteboards.tsx';
import { fetchWhiteboardWithUserIdAsync } from '../store/whiteboard/whiteboardApis.ts';

type TMapStateToProps = (state: RootState) => {
    whiteboards: ISingleWhiteboard[];
};
const mapStateToProps: TMapStateToProps = (state) => ({
    whiteboards: state.whiteboardSlice.whiteboards,
});

type TMapDispatchToProps = (dispatch: AppDispatch) => {
    setCurrentWhiteboard: typeof setCurrentWhiteboard;
    fetchWhiteboardsByUserIdAsync: typeof fetchWhiteboardWithUserIdAsync;
};
const mapDispatchToProps: TMapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchWhiteboardsByUserIdAsync: fetchWhiteboardWithUserIdAsync,
            setCurrentWhiteboard: setCurrentWhiteboard,
        },
        dispatch,
    );
};

// MAKING CONTAINER
const SavedWhiteboardsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SavedWhiteboards);

export default SavedWhiteboardsContainer;
