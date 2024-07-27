import { AppDispatch, RootState } from '../store/store.ts';
import { ISingleWhiteboard } from '../store/whiteboard/types.ts';
import { connect } from 'react-redux';
import ViewAllWhiteboards from '../components/Whiteboard/ViewAllWhiteboards.tsx';
import { bindActionCreators } from '@reduxjs/toolkit';
import { setCurrentWhiteboard } from '../store/whiteboard/whiteboardSlice.ts';
import { deleteWhiteboard } from '../store/whiteboard/whiteboardApis.ts';
import { IUserDto } from '../store/Users/types.ts';

// TYPES
type TMapStateToProps = (state: RootState) => {
    whiteboards: ISingleWhiteboard[];
    userDto: IUserDto;
};
type TMapDispatchToProps = (dispatch: AppDispatch) => {
    setCurrentWhiteboard: typeof setCurrentWhiteboard;
    deleteWhiteboard: typeof deleteWhiteboard;
};

export type TViewAllWHiteboardsProps = ReturnType<TMapStateToProps> &
    ReturnType<TMapDispatchToProps>;

// MAPPING STATE
const mapStateToProps: TMapStateToProps = (state) => ({
    whiteboards: state.whiteboardSlice.whiteboards,
    userDto: state.usersSlice.userDto!,
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
