import MarkdownEditor from '@uiw/react-markdown-editor';
import { useId, useRef, useState } from 'react';
import Button from '../../shared/button/Button.tsx';
import Dialogue from '../../shared/components/dialogue/Dialogue.tsx';
import { showComponent } from '../../utils/visibility.ts';
import CreateNotesDialogue from './CreateNotesDialogue.tsx';
import { IUpdateNoteRequest } from '../../store/Notes/types.ts';
import BackBtnSvg from '../../assets/button-svgs/BackBtnSvg.tsx';
import { useNavigate } from 'react-router-dom';
import { updateNoteAsync } from '../../store/Notes/notesApis.ts';

export interface IUpdateNoteProps {
    updateNoteAsync: typeof updateNoteAsync;
}

const UpdateNote: React.FC<IUpdateNoteProps> = ({ updateNoteAsync }) => {
    // Hooks
    const navigate = useNavigate();
    const dialogueId = useId();
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [content, setContent] = useState<string>(
        '# Hello world\n' +
            '\n' +
            '``` python\n' +
            "print('Happy coding')\n" +
            '```',
    );

    // Event handlers
    const handleUpdateContent = (state: string) => {
        setContent(state);
    };
    const handleBack = () => navigate('/');
    const handleClear = () => setContent('');
    const handleSave = () => {
        if (content) {
            showComponent(dialogueId);
            titleInputRef.current?.focus();
        } else alert('Please provide a content to save');
    };

    // Function to update note
    const updateNote = (title: string) => {
        const obj: IUpdateNoteRequest = {
            id: 1,
            title,
            content,
            userId: 1,
        };
        updateNoteAsync(obj);
    };

    return (
        <>
            <Dialogue id={dialogueId}>
                <CreateNotesDialogue
                    titleInputRef={titleInputRef}
                    createOrUpdateNotes={updateNote}
                    dialogueId={dialogueId}
                />
            </Dialogue>

            <div className={`create-notes-ctn overflow-hidden`}>
                {/* Markdown editor */}
                <MarkdownEditor
                    value={content}
                    enablePreview={false}
                    height={`95vh`}
                    onChange={handleUpdateContent}
                />
                <div className={`flex flex-col`}>
                    <div
                        className={`flex justify-between border-b-2 border-primary-700 px-4 py-1`}
                    >
                        <div className={`flex items-center space-x-4`}>
                            {/* Back button */}
                            <Button
                                onClick={handleBack}
                                className={`p-1 shadow-sm shadow-secondary transition-all duration-200 hover:bg-secondary`}
                            >
                                <BackBtnSvg />
                            </Button>
                            {/* Clear button */}
                            <Button
                                onClick={handleClear}
                                className={`rounded border-2 border-red-700 px-4 py-0.5 transition-all duration-200 hover:bg-red-700`}
                            >
                                Clear
                            </Button>
                        </div>

                        {/* Save Button */}
                        <Button
                            onClick={handleSave}
                            className={`rounded border-2 border-green-700 px-4 py-0.5 transition-all duration-200 hover:bg-green-700`}
                        >
                            Save
                        </Button>
                    </div>
                    {/* Markdown preview */}
                    <MarkdownEditor.Markdown
                        source={content}
                        className={`mb-4 h-[95vh] overflow-auto bg-primary px-6 py-2 shadow-lg shadow-secondary`}
                    />
                </div>
            </div>
        </>
    );
};

export default UpdateNote;
