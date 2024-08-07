import MarkdownEditor from '@uiw/react-markdown-editor';
import { useId, useRef, useState } from 'react';
import Button from '../../shared/button/Button.tsx';
import Dialogue from '../../shared/components/dialogue/Dialogue.tsx';
import { showComponent } from '../../utils/visibility.ts';
import CreateNotesDialogue from './CreateNotesDialogue.tsx';
import { ISingleNote } from '../../store/Notes/types.ts';
import BackBtnSvg from '../../assets/button-svgs/BackBtnSvg.tsx';
import { useNavigate } from 'react-router-dom';
import { TCreateNotesProps } from '../../containers/CreateNotesContainer.tsx';

const CreateNotes = ({ createCaseAsync, userDto }: TCreateNotesProps) => {
    // Markdown Editor HEIGHT
    const mdEditorHeight: string = window.innerWidth >= 768 ? '95vh' : '35vh';

    // store Hooks
    const navigate = useNavigate();

    // Hooks
    const dialogueId = useId();
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string>('');
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

    // following function is passed in the dialogue component instead of passing the content directly
    // there is no validations check in the function so validations should be applied before calling this Fn
    const createNotes = () => {
        const obj: ISingleNote = {
            title,
            content,
            userId: Number.parseInt(userDto.id),
        };
        createCaseAsync(obj);
    };
    return (
        <>
            <Dialogue id={dialogueId}>
                <CreateNotesDialogue
                    titleInputRef={titleInputRef}
                    createOrUpdateNotes={createNotes}
                    titleState={title}
                    setTitleState={setTitle}
                    dialogueId={dialogueId}
                />
            </Dialogue>

            <div className={`create-notes-ctn overflow-hidden`}>
                {/*dialog for title of the notes*/}

                {/*markdown editor*/}
                <MarkdownEditor
                    value={content}
                    enablePreview={false}
                    height={mdEditorHeight}
                    onChange={handleUpdateContent}
                />
                <div className={`flex flex-col`}>
                    <div
                        className={`flex justify-between border-b-2 border-primary-700 px-4 py-1`}
                    >
                        <div className={`flex items-center space-x-4`}>
                            {/*Back button*/}
                            <Button
                                onClick={handleBack}
                                className={`p-1 shadow-sm shadow-secondary transition-all duration-200 hover:bg-secondary`}
                            >
                                <BackBtnSvg />
                            </Button>
                            {/*clear button*/}
                            <Button
                                onClick={handleClear}
                                className={`rounded border-2 border-red-700 px-4 py-0.5 transition-all duration-200 hover:bg-red-700`}
                            >
                                Clear
                            </Button>
                        </div>

                        {/*Save Button*/}
                        <Button
                            onClick={handleSave}
                            className={`rounded border-2 border-green-700 px-4 py-0.5 transition-all duration-200 hover:bg-green-700`}
                        >
                            Save
                        </Button>
                    </div>
                    <MarkdownEditor.Markdown
                        source={content}
                        className={`mb-4 h-[60vh] overflow-auto bg-primary px-6 py-2 shadow-lg shadow-secondary md:h-[95vh]`}
                    />
                </div>
            </div>
        </>
    );
};

export default CreateNotes;
