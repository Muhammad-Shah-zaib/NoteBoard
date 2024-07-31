import './SideBar.css';
import WriteIcon from '../../../assets/button-svgs/WriteIcon.tsx';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { TSavedWhiteboardProps } from '../../../containers/SavedWhiteboardsContainer.tsx';

const SavedWhiteboards = ({
    userDto,
    whiteboards,
    fetchWhiteboardsByUserIdAsync,
    setCurrentWhiteboard,
}: TSavedWhiteboardProps) => {
    // ROUTE HOOKS
    // USE EFFECT
    useEffect(() => {
        fetchWhiteboardsByUserIdAsync({ userId: Number.parseInt(userDto!.id) });
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
                    {whiteboards.length == 0 && (
                        <p
                            className={`text-center font-mono text-sm text-primary-500`}
                        >
                            <em>You have no saved notes</em>
                        </p>
                    )}
                    {whiteboards
                        .filter((_, i) => i < 3)
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
                    {whiteboards.length > 0 && (
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
