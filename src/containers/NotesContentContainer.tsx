import { RootState } from '../store/store.ts';
import { currentNoteSelector } from '../store/Notes/NotesSlice.ts';
import { connect } from 'react-redux';
import NotesContent from '../components/Notes/NotesContent.tsx';
import { ISingleNote } from '../store/Notes/types.ts';

type TMapStateToProps = (state: RootState) => {
    currentNote: ISingleNote;
};
const mapStateToProps: TMapStateToProps = (state: RootState) => ({
    currentNote: currentNoteSelector(state),
});

const NotesContentContainer: React.FC = connect(mapStateToProps)(NotesContent);

export default NotesContentContainer;
