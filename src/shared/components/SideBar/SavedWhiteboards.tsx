import './SideBar.css';
import WriteIcon from '../../../assets/button-svgs/WriteIcon.tsx';
import { Link } from 'react-router-dom';
import { ISingleWhiteboard } from '../../../store/whiteboard/types.ts';
import { useEffect } from 'react';
import { fetchWhiteboardWithUserIdAsync } from '../../../store/whiteboard/whiteboardApis.ts';
import { setCurrentWhiteboard } from '../../../store/whiteboard/whiteboardSlice.ts';

export interface ISavedWhiteboardsProps {
    whiteboards: ISingleWhiteboard[];
    fetchWhiteboardsByUserIdAsync: typeof fetchWhiteboardWithUserIdAsync;
    setCurrentWhiteboard: typeof setCurrentWhiteboard;
}

const SavedWhiteboards = ({
    whiteboards,
    fetchWhiteboardsByUserIdAsync,
    setCurrentWhiteboard,
}: ISavedWhiteboardsProps) => {
    // ROUTE HOOKS
    // USE EFFECT
    useEffect(() => {
        fetchWhiteboardsByUserIdAsync({ userId: 1 });
    }, [fetchWhiteboardsByUserIdAsync]);
    return (
        <>
            <div className={`whiteboard-ctn`}>
                <div className={`group flex items-center justify-between`}>
                    <h3 className={`px-2 pt-2 font-mono text-lg font-bold`}>
                        Whiteboard
                    </h3>
                    <Link
                        to={`/create-whiteboard`}
                        onClick={() => {
                            setCurrentWhiteboard(null);
                        }}
                        className={`hidden p-1 transition-all duration-200 hover:bg-primary group-hover:inline`}
                    >
                        <WriteIcon />
                    </Link>
                </div>
                {/* existing whiteboards */}
                <div>
                    {whiteboards
                        .filter((_, i) => i < 2)
                        .map((w, i) => (
                            <div key={w.id ? w.id : i}>
                                <Link
                                    to={`/update-whiteboard/${w.id}`}
                                    key={i}
                                    onClick={() => {
                                        setCurrentWhiteboard(w);
                                    }}
                                    className={`flex cursor-pointer rounded-lg px-2 py-1 transition-all duration-300 hover:bg-zinc-800`}
                                >
                                    <span className={`text-sm`}>
                                        {w.title.length > 15
                                            ? w.title.substring(0, 15) + '...'
                                            : w.title}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    {whiteboards.length > 2 && (
                        <Link
                            to={`view-all-whiteboards`}
                            className={`my-1 flex w-full cursor-pointer rounded-lg px-2 py-2 font-mono text-xs font-bold underline-offset-4 hover:bg-primary hover:underline`}
                        >
                            <p className={`w-full text-center`}>View All</p>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default SavedWhiteboards;
