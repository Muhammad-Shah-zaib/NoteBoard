import './Notes.css';
import NotesContentContainer from '../../containers/NotesContentContainer.tsx';
const Notes = () => {
    return (
        <div className={'notes-ctn py-8'}>
            <main className={`h-3/4`}>
                <NotesContentContainer />
            </main>
        </div>
    );
};

export default Notes;
