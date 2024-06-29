import { Link } from 'react-router-dom';
import WriteIcon from '../../../assets/button-svgs/WriteIcon.tsx';
import { ISingleNote } from '../../../store/Notes/types.ts';
import React from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

// exporting this interface as it is needed for the container
export interface SavedNotesProps {
    notes: ISingleNote[];
    updateCurrentNote: ActionCreatorWithPayload<ISingleNote, string>;
}
const SavedNotes: React.FC<SavedNotesProps> = ({
    notes,
    updateCurrentNote,
}) => {
    console.log(notes);
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
                    {notes
                        .filter((n, i) => {
                            if (i < 3) {
                                if (n.title.length > 20) {
                                    n.title = n.title.substring(0, 20) + '...';
                                }
                                return true;
                            }
                            return false;
                        })
                        .map((n, i) => (
                            <div
                                key={i}
                                onClick={() => updateCurrentNote(n)}
                                className={`cursor-pointer rounded-lg px-2 py-1 transition-all duration-300 hover:bg-zinc-800`}
                            >
                                <span className={`text-sm`}>{n.title}</span>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default SavedNotes;
