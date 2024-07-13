import Button from '../../shared/button/Button.tsx';
import CloseBtnSvg from '../../assets/button-svgs/CloseBtnSvg.tsx';
import React, { ChangeEvent, RefObject, useState } from 'react';
import { hideComponent } from '../../utils/visibility.ts';
import { useNavigate } from 'react-router-dom';

interface IWhiteboardDialogueProps {
    whiteboardId: string;
    createOrUpdateWhiteboard: () => void;
    titleInputRef: RefObject<HTMLInputElement>;
    titleState: string;
    setTitleState: (title: string) => void;
}

const CreateWhiteboardDialogue = ({
    whiteboardId,
    titleInputRef,
    titleState,
    setTitleState,
    createOrUpdateWhiteboard,
}: IWhiteboardDialogueProps) => {
    // NAVIGATE HOOK
    const navigate = useNavigate();
    // ERROR STATE
    const [error, setError] = useState<{ message: string } | null>(null);

    // HANDLE TO UPDATE THE TITLE STATE
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(null);
        setTitleState(e.target.value);
    };

    // HANDLE SUBMIT TO SEND A POST REQUEST
    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();
        if (!titleState) {
            setError({ message: 'Title is required' });
        } else {
            createOrUpdateWhiteboard();
            // Now we need to navigate to whiteboard url
            navigate(`/whiteboard/9999`);
        }
    };

    //
    return (
        <div className={`flex w-full flex-col gap-4 p-4`}>
            {/*header*/}
            <div
                className={`flex items-center justify-between border-b-2 border-primary pb-2`}
            >
                <h1
                    className={`font-mono text-base font-bold md:text-lg lg:text-xl`}
                >
                    Saving notes
                </h1>
                <Button
                    id={`dialogue-close-btn`}
                    onClick={() => {
                        hideComponent(whiteboardId);
                    }}
                    className={`rounded-full transition-all duration-200 hover:bg-red-500`}
                >
                    <CloseBtnSvg />
                </Button>
            </div>
            {/*main content*/}
            <form
                className={`flex h-full w-full flex-col gap-4 font-mono font-bold`}
            >
                <div
                    className={`grid grid-cols-4 items-center text-sm md:text-base lg:text-lg`}
                >
                    <label
                        htmlFor={`title-input`}
                        className={`md: cursor-pointer text-sm md:text-base lg:text-lg`}
                    >
                        Title:
                        <span className={`text-red-500`}>*</span>
                    </label>
                    <input
                        onChange={handleOnChange}
                        ref={titleInputRef}
                        value={titleState}
                        id={`whiteboard-title-input`}
                        placeholder={`Title`}
                        className={`col-span-3 rounded-lg border-2 border-primary bg-transparent px-4 py-1 placeholder-primary-500`}
                    />
                    {error && (
                        <p
                            className={`col-span-4 px-4 pt-2 font-mono text-sm font-bold text-red-500`}
                        >
                            {error.message}
                        </p>
                    )}
                </div>
                {/* footer of form*/}
                <div
                    className={`flex w-full flex-row-reverse items-center gap-4`}
                >
                    <Button
                        onClick={handleSubmit}
                        id={`submit-button`}
                        type={'submit'}
                        className={`rounded-lg border-2 border-green-700 px-4 py-1.5 text-center transition-all duration-200 hover:bg-green-700`}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            hideComponent(whiteboardId);
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

export default CreateWhiteboardDialogue;
