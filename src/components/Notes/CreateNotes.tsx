import MarkdownEditor from '@uiw/react-markdown-editor';
import { useState } from 'react';
import Button from '../../shared/button/Button.tsx';

const CreateNotes = () => {
    const [content, setContent] = useState<string>('dsd');
    const handleUpdateContent = (state: string) => {
        setContent(state);
    };
    return (
        <div className={`create-notes-ctn overflow-hidden`}>
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
                    <Button
                        className={`rounded border-2 border-red-700 px-4 py-0.5 transition-all duration-200 hover:bg-red-700`}
                    >
                        Clear
                    </Button>
                    <Button
                        className={`rounded border-2 border-green-700 px-4 py-0.5 transition-all duration-200 hover:bg-green-700`}
                    >
                        Save
                    </Button>
                </div>
                <MarkdownEditor.Markdown
                    source={content}
                    className={`mb-4 min-h-full overflow-auto bg-primary px-6 py-2 shadow-lg shadow-secondary`}
                />
            </div>
        </div>
    );
};

export default CreateNotes;
