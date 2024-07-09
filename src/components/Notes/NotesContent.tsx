import MarkdownEditor from '@uiw/react-markdown-editor';
import { ISingleNote } from '../../store/Notes/types.ts';

interface NotesContentProps {
    currentNote: ISingleNote | null;
}
const NotesContent = ({ currentNote }: NotesContentProps) => {
    return (
        <div
            className={`flex h-full w-full justify-center px-[20px] md:px-[150px] lg:px-[200px]`}
        >
            {/* Header */}
            <header className={`h-full w-full max-w-[1024px]`}>
                <MarkdownEditor.Markdown
                    source={currentNote ? currentNote.content : ''}
                    className={`mb-4 min-h-[50vh] overflow-auto border-secondary bg-primary px-6 py-2 shadow-lg shadow-secondary`}
                />
            </header>
        </div>
    );
};

export default NotesContent;
