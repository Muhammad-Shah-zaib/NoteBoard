import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import Home from '../shared/components/Home/Home';
import { ISingleNote } from '../store/Notes/types';
import { IUserDto } from '../store/Users/types';
import { updateCurrentNote } from '../store/Notes/NotesSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { ISingleWhiteboard } from '../store/whiteboard/types';
import { setCurrentWhiteboard } from '../store/whiteboard/whiteboardSlice';

type TMapStateToProps = (state: RootState) => {
    userDto: IUserDto;
    notesDto: ISingleNote[];
    whiteboardsDto: ISingleWhiteboard[];
};
type TMapDispatchToProps = (dispatch: AppDispatch) => {
    updateCurrentNote: typeof updateCurrentNote;
    setCurrentWhiteboard: typeof setCurrentWhiteboard;
};
export type THomeProps = ReturnType<TMapStateToProps> &
    ReturnType<TMapDispatchToProps>;

const mapStateToProps: TMapStateToProps = (state) => ({
    notesDto: state.notesSlice.notes,
    userDto: state.usersSlice.userDto!,
    whiteboardsDto: state.whiteboardSlice.whiteboards,
});
const mapDispatchToProps: TMapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            updateCurrentNote,
            setCurrentWhiteboard,
        },
        dispatch,
    );
};
const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;
