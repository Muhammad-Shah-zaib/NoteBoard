import { IDeleteNoteRequestDto, ISingleNote } from '../../store/Notes/types.ts';
import CloseBtnSvg from '../../assets/button-svgs/CloseBtnSvg.tsx';
import Button from '../../shared/button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { updateCurrentNote } from '../../store/Notes/NotesSlice.ts';
import WriteIcon from '../../assets/button-svgs/WriteIcon.tsx';
import { deleteNoteById } from '../../store/Notes/notesApis.ts';

export interface IViewAllNotesProps {
    notes: ISingleNote[];
    updateCurrentNote: typeof updateCurrentNote;
    deleteNoteById: typeof deleteNoteById;
}
const ViewAllNotes = ({
    notes,
    updateCurrentNote,
    deleteNoteById,
}: IViewAllNotesProps) => {
    const navigate = useNavigate();
    const handleCurrentNote = (note: ISingleNote) => {
        updateCurrentNote(note);
        navigate(`/notes`);
    };
    const handleDelete = (request: IDeleteNoteRequestDto) => {
        deleteNoteById(request);
    };
    return (
        <div
            className={`2-full grid grid-cols-4 gap-8 overflow-auto px-8 py-4`}
        >
            {notes.map((n, i) => (
                <div
                    onClick={() => handleCurrentNote(n)}
                    key={n.id ? n.id : i}
                    className={`items-between flex h-full cursor-pointer flex-col justify-center gap-4 px-4 py-2 shadow-md shadow-secondary hover:bg-primary-700 hover:shadow-lg`}
                >
                    <div
                        className={`flex w-full items-center justify-between gap-4`}
                    >
                        <p
                            className={`max-w-[60%] whitespace-normal break-words`}
                        >
                            {n.title}
                        </p>
                        <div className={`flex gap-2`}>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (confirm()) {
                                        if (n.id) {
                                            handleDelete({
                                                noteId: n.id!,
                                                userId: n.userId,
                                            });
                                        }
                                    }
                                }}
                                className={`rounded-full transition-all duration-200 hover:bg-primary-700`}
                            >
                                <CloseBtnSvg />
                            </Button>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    navigate('/update-notes/' + n.id);
                                }}
                                className={`transition-all duration-200 hover:bg-primary-700`}
                            >
                                <WriteIcon />
                            </Button>
                        </div>
                    </div>
                    <div className={`w-full`}>
                        <p className={`w-full text-end text-xs opacity-40`}>
                            Created At: 25-04-2025
                        </p>
                        <p className={`w-full text-end text-xs opacity-40`}>
                            Modified At At: 25-04-2025
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ViewAllNotes;
