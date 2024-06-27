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
                    className={`shadow-secondary border-secondary mb-4 min-h-[95vh] overflow-auto bg-primary px-6 py-2 shadow-lg`}
                />
            </header>
        </div>
    );
};

export default NotesContent;
