import { Link, useNavigate } from 'react-router-dom';
import WriteIcon from '../../../assets/button-svgs/WriteIcon.tsx';
import React, { useEffect } from 'react';
import EditBtnSvg from '../../../assets/button-svgs/EditBtnSvg.tsx';
import Button from '../../button/Button.tsx';
import { TSavedNotesProps } from '../../../containers/SavedNotesContainer.tsx';

const SavedNotes: React.FC<TSavedNotesProps> = ({
    notes,
    userDto,
    updateCurrentNote,
    fetchNotesByUserId,
}) => {
    // router hooks
    const navigate = useNavigate();
    // hooks
    useEffect(() => {
        fetchNotesByUserId(Number.parseInt(userDto!.id));
    }, []);
    return (
        <>
            <div className={`saved-notes-ctn`}>
                <div className={`group flex items-center justify-between`}>
                    <h3 className={`px-2 pt-2 font-mono text-lg font-bold`}>
                        Notes
                    </h3>
                    <Link
                        to={`/create-notes`}
                        className={`hidden p-1 transition-all duration-200 hover:bg-primary group-hover:inline`}
                    >
                        <WriteIcon />
                    </Link>
                </div>
                {/* existing whiteboards */}
                <div>
                    {notes.length === 0 && (
                        <p
                            className={`text-center font-mono text-sm text-primary-500`}
                        >
                            <em>You have no saved notes</em>
                        </p>
                    )}
                    {notes &&
                        notes.slice(0, 2).map((n, i) => (
                            <div className="relative">
                                <Link
                                    to={`/notes`}
                                    key={n.id ? n.id : i}
                                    onClick={() => {
                                        updateCurrentNote(n);
                                    }}
                                    className={`group flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-2 py-0.5 transition-all duration-300 hover:bg-zinc-800`}
                                >
                                    <span className={`text-sm`}>
                                        {n.title.length > 15
                                            ? n.title.substring(0, 15) + '...'
                                            : n.title}
                                    </span>
                                </Link>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateCurrentNote(n);
                                        navigate('update-notes/' + n.id!);
                                    }}
                                    className={`absolute right-0 top-0 z-30 p-1 transition-all duration-200 hover:bg-primary-700 group-hover:pointer-events-auto group-hover:visible`}
                                >
                                    {<EditBtnSvg />}
                                </Button>
                            </div>
                        ))}
                    {notes.length > 2 && (
                        <Link
                            to={`view-all-notes`}
                            className={`my-1 flex w-full cursor-pointer rounded-lg px-2 py-2 font-mono text-xs font-bold underline-offset-4 hover:bg-primary hover:underline`}
                        >
                            <p className={`w-full text-center`}>View All</p>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default SavedNotes;
