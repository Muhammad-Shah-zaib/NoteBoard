import { RootState } from '../store/store.ts';
import { connect } from 'react-redux';
import { ISingleWhiteboard } from '../store/whiteboard/types.ts';
import ViewWhiteboard from '../components/Whiteboard/ViewWhiteboard.tsx';

type TMapStateToProps = (state: RootState) => {
    currentWhiteboard: ISingleWhiteboard | null;
};
const mapStateToProps: TMapStateToProps = (state) => ({
    currentWhiteboard: state.whiteboardSlice.currentWhiteboard,
});

const ViewWhiteboardContainer = connect(mapStateToProps)(ViewWhiteboard);

export default ViewWhiteboardContainer;
