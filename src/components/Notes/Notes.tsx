import './Notes.css';
import NotesContentContainer from '../../containers/NotesContentContainer.tsx';
const Notes = () => {
    return (
        <div className={'notes-ctn'}>
            {/* Header */}
            <header className={`h-1/5 w-full`}>
                {/* image */}
                <div
                    className={`relative h-full w-full opacity-80 shadow-lg shadow-secondary`}
                >
                    <img
                        src={`defaultNotesPic.jpg`}
                        className={`h-full w-full`}
                        alt={``}
                    />
                </div>
            </header>

            <main className={`h-3/4`}>
                <NotesContentContainer />
            </main>
        </div>
    );
};

export default Notes;
