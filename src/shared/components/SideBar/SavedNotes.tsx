import { Link, useNavigate } from 'react-router-dom';
import WriteIcon from '../../../assets/button-svgs/WriteIcon.tsx';
import { ISingleNote } from '../../../store/Notes/types.ts';
import React, { useEffect } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import EditBtnSvg from '../../../assets/button-svgs/EditBtnSvg.tsx';
import {
    fetchNoteById,
    fetchNotesByUserId,
} from '../../../store/Notes/notesApis.ts';
import Button from '../../button/Button.tsx';

// exporting this interface as it is needed for the container
export interface SavedNotesProps {
    notes: ISingleNote[];
    updateCurrentNote: ActionCreatorWithPayload<ISingleNote, string>;
    fetchNotesByUserId: typeof fetchNotesByUserId;
    fetchNoteById: typeof fetchNoteById;
}
const SavedNotes: React.FC<SavedNotesProps> = ({
    notes,
    updateCurrentNote,
    fetchNotesByUserId,
}) => {
    // router hooks
    const navigate = useNavigate();
    // hooks
    useEffect(() => {
        fetchNotesByUserId(1);
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
                    {notes &&
                        notes.slice(0, 2).map((n, i) => (
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
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateCurrentNote(n);
                                        navigate('update-notes/' + n.id!);
                                    }}
                                    className={`pointer-events-none invisible p-1 transition-all duration-200 hover:bg-primary-700 group-hover:pointer-events-auto group-hover:visible`}
                                >
                                    {<EditBtnSvg />}
                                </Button>
                            </Link>
                        ))}
                    <Link
                        to={`view-all-notes`}
                        className={`my-1 flex w-full cursor-pointer rounded-lg px-2 py-2 font-mono text-xs font-bold underline-offset-4 hover:bg-primary hover:underline`}
                    >
                        <p className={`w-full text-center`}>View All</p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SavedNotes;
