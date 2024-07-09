import MarkdownEditor from '@uiw/react-markdown-editor';
import { useId, useRef, useState } from 'react';
import Button from '../../shared/button/Button.tsx';
import Dialogue from '../../shared/components/dialogue/Dialogue.tsx';
import { showComponent } from '../../utils/visibility.ts';
import CreateNotesDialogue from './CreateNotesDialogue.tsx';
import { ISingleNote, IUpdateNoteRequest } from '../../store/Notes/types.ts';
import BackBtnSvg from '../../assets/button-svgs/BackBtnSvg.tsx';
import { useNavigate } from 'react-router-dom';
import { updateNoteAsync } from '../../store/Notes/notesApis.ts';

export interface IUpdateNoteProps {
    updateNoteAsync: typeof updateNoteAsync;
    currentNote: ISingleNote;
}

const UpdateNote: React.FC<IUpdateNoteProps> = ({
    updateNoteAsync,
    currentNote,
}) => {
    // Markdown editor Height
    const mdEditorHeight: string = window.innerWidth > 768 ? '95vh' : '35vh';

    // router Hooks
    const navigate = useNavigate();

    // hooks
    const dialogueId = useId();
    const [content, setContent] = useState<string>(currentNote.content);
    const [title, setTitle] = useState<string>(currentNote.title);
    const titleInputRef = useRef<HTMLInputElement>(null);

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
    const updateNote = () => {
        console.log(title, content);
        const obj: IUpdateNoteRequest = {
            userId: currentNote.userId,
            noteId: currentNote.id!,
            body: {
                title: title,
                content: content,
            },
        };
        updateNoteAsync(obj);
    };

    return (
        <>
            <Dialogue id={dialogueId}>
                <CreateNotesDialogue
                    titleInputRef={titleInputRef}
                    titleState={title}
                    setTitleState={setTitle}
                    createOrUpdateNotes={updateNote}
                    dialogueId={dialogueId}
                />
            </Dialogue>

            <div className={`create-notes-ctn overflow-hidden`}>
                {/* Markdown editor */}
                <MarkdownEditor
                    value={content}
                    enablePreview={false}
                    height={mdEditorHeight}
                    onChange={handleUpdateContent}
                />
                <div className={`flex flex-col`}>
                    <div
                        className={`flex w-screen justify-between border-b-2 border-primary-700 px-4 py-1 md:w-auto`}
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
                            className={`rounded border-2 border-yellow-500 px-4 py-0.5 transition-all duration-200 hover:bg-yellow-500 hover:text-black`}
                        >
                            Update
                        </Button>
                    </div>
                    {/* Markdown preview */}
                    <MarkdownEditor.Markdown
                        source={content}
                        className={`mb-4 h-[60vh] overflow-auto bg-primary px-6 py-2 shadow-lg shadow-secondary md:h-[95vh]`}
                    />
                </div>
            </div>
        </>
    );
};

export default UpdateNote;
