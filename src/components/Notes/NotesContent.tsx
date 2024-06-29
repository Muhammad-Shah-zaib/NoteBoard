import { useAppSelector } from '../../store/store.ts';
import MarkdownEditor from '@uiw/react-markdown-editor';

const NotesContent = () => {
    const curNote = useAppSelector((state) => state.notes);
    return (
        <div className={`h-full w-full px-[200px]`}>
            {/* Header */}
            <header className={`h-full w-full`}>
                <MarkdownEditor.Markdown
                    source={curNote.content}
                    className={`mb-4 min-h-[50vh] overflow-auto border-secondary bg-primary px-6 py-2 shadow-lg shadow-secondary`}
                />
            </header>
        </div>
    );
};

export default NotesContent;
