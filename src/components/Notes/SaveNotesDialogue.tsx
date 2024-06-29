import Button from '../../shared/button/Button.tsx';
import { hideComponent } from '../../utils/visibility.ts';
import CloseIcon from '../../assets/button-svgs/CloseIcon.tsx';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface dialogueProps {
    dialogueId: string;
    createNotes: (title: string) => void;
}
const SaveNotesDialogue = ({ dialogueId, createNotes }: dialogueProps) => {
    // router Hooks
    const navigate = useNavigate();
    // Hooks
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<boolean>(false);

    const handleOnChange = () => {
        if (error || !titleInputRef.current!.value) setError(false);
    };
    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault();
        const title = titleInputRef.current!.value;
        if (titleInputRef.current!.value) {
            createNotes(title);
            navigate('/');
        } else setError(true);
    };
    return (
        <div className={`flex w-full flex-col gap-4 p-4`}>
            {/*header*/}
            <div
                className={`flex items-center justify-between border-b-2 border-primary pb-2`}
            >
                <h1 className={`font-mono text-xl font-bold`}>Saving notes</h1>
                <Button
                    className={`rounded-full transition-all duration-200 hover:bg-red-500`}
                    onClick={() => hideComponent(dialogueId)}
                >
                    <CloseIcon />
                </Button>
            </div>
            {/*main content*/}
            <form
                className={`flex h-full w-full flex-col gap-4 font-mono font-bold`}
            >
                <div className={`grid grid-cols-4 items-center`}>
                    <label
                        htmlFor={`title-input`}
                        className={`cursor-pointer text-lg`}
                    >
                        Title:
                        <span className={`text-red-500`}>*</span>:
                    </label>
                    <input
                        ref={titleInputRef}
                        id={`title-input`}
                        onChange={handleOnChange}
                        required
                        placeholder={`Title`}
                        className={`col-span-3 rounded-lg border-2 border-primary bg-transparent px-4 py-1 placeholder-primary-500`}
                    />
                    {/* error field*/}
                    {error && (
                        <p className={`col-span-4 mt-4 text-sm text-red-700`}>
                            Title is required field
                        </p>
                    )}
                </div>
                {/* footer of form*/}
                <div className={`flex w-full items-center justify-end gap-4`}>
                    <Button
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            hideComponent(dialogueId);
                        }}
                        className={`rounded-lg border-2 border-red-500 px-4 py-1.5 text-center transition-all duration-200 hover:bg-red-500`}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={handleSave}
                        className={`rounded-lg border-2 border-green-700 px-4 py-1.5 text-center transition-all duration-200 hover:bg-green-700`}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default SaveNotesDialogue;
