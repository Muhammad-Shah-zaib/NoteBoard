import Button from '../../shared/button/Button.tsx';
import { hideComponent } from '../../utils/visibility.ts';
import CloseBtnSvg from '../../assets/button-svgs/CloseBtnSvg.tsx';
import React, { MutableRefObject, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface dialogueProps {
    dialogueId: string;
    createOrUpdateNotes: (title: string) => void;
    titleInputRef: MutableRefObject<HTMLInputElement | null>;
}
const CreateNotesDialogue = ({
    dialogueId,
    createOrUpdateNotes,
    titleInputRef,
}: dialogueProps) => {
    // router Hooks
    const navigate = useNavigate();
    // Hooks
    const [error, setError] = useState<boolean>(false);

    const handleOnChange = () => {
        if (error || !titleInputRef.current!.value) setError(false);
    };
    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault();
        const title = titleInputRef.current!.value;
        if (titleInputRef.current!.value) {
            createOrUpdateNotes(title);
            navigate('/');
        } else setError(true);
    };
    const handleCLose = () => {
        hideComponent(dialogueId);
        setError(false);
        titleInputRef.current!.value = '';
    };
    ``;
    return (
        <div className={`flex w-full flex-col gap-4 p-4`}>
            {/*header*/}
            <div
                className={`flex items-center justify-between border-b-2 border-primary pb-2`}
            >
                <h1 className={`font-mono text-xl font-bold`}>Saving notes</h1>
                <Button
                    id={`dialogue-close-btn`}
                    className={`rounded-full transition-all duration-200 hover:bg-red-500`}
                    onClick={handleCLose}
                >
                    <CloseBtnSvg />
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
                <div
                    className={`flex w-full flex-row-reverse items-center gap-4`}
                >
                    <Button
                        id={`submit-button`}
                        type={'submit'}
                        onClick={handleSave}
                        className={`rounded-lg border-2 border-green-700 px-4 py-1.5 text-center transition-all duration-200 hover:bg-green-700`}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            hideComponent(dialogueId);
                        }}
                        className={`rounded-lg border-2 border-red-500 px-4 py-1.5 text-center transition-all duration-200 hover:bg-red-500`}
                    >
                        Back
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default CreateNotesDialogue;
