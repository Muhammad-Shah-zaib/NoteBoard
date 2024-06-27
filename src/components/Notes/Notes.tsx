import './Notes.css';
import NotesContent from './NotesContent.tsx';
const Notes = () => {
    return (
        <div className={'notes-ctn'}>
            {/* Header */}
            <header className={`h-1/5 w-full`}>
                {/* image */}
                <div
                    className={`shadow-secondary relative h-full w-full opacity-80 shadow-lg`}
                >
                    <img
                        src={`defaultNotesPic.jpg`}
                        className={`h-full w-full`}
                        alt={``}
                    />
                </div>
            </header>

            <main>
                <NotesContent />
            </main>
        </div>
    );
};

export default Notes;
