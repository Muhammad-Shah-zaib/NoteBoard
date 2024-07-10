import { IDeleteNoteRequestDto, ISingleNote } from '../../store/Notes/types.ts';
import CloseBtnSvg from '../../assets/button-svgs/CloseBtnSvg.tsx';
import Button from '../../shared/button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { updateCurrentNote } from '../../store/Notes/NotesSlice.ts';
import { deleteNoteById } from '../../store/Notes/notesApis.ts';
import EditBtnSvg from '../../assets/button-svgs/EditBtnSvg.tsx';

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
        <div className="flex h-screen w-screen items-center justify-center md:h-full md:w-full">
            <div
                className={`xs:grid-cols-2 grid w-full max-w-[1024px] justify-center gap-8 overflow-auto px-8 py-4 md:grid-cols-4`}
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
                            <div className={`flex flex-row-reverse gap-2`}>
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
                                    className={`rounded-full transition-all duration-200 hover:bg-red-500`}
                                >
                                    <CloseBtnSvg />
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        navigate('/update-notes/' + n.id);
                                    }}
                                    className={`px-0.5 transition-all duration-200 hover:bg-zinc-500`}
                                >
                                    <EditBtnSvg />
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
        </div>
    );
};

export default ViewAllNotes;
