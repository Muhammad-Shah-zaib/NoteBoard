import './SideBar.css';
import WriteIcon from '../../../assets/button-svgs/WriteIcon.tsx';
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    // USE EFFECT
    useEffect(() => {
        fetchWhiteboardsByUserIdAsync({ userId: 1 });
    }, []);
    return (
        <>
            <div className={`whiteboard-ctn`}>
                <div className={`group flex items-center justify-between`}>
                    <h3 className={`px-2 pt-2 font-mono text-lg font-bold`}>
                        Whiteboard
                    </h3>
                    <Link
                        to={`/create-whiteboard`}
                        className={`hidden p-1 transition-all duration-200 hover:bg-primary group-hover:inline`}
                    >
                        <WriteIcon />
                    </Link>
                </div>
                {/* existing whiteboards */}
                <div>
                    {whiteboards
                        .filter((w, i) => {
                            if (i < 3) {
                                if (w.title.length > 20) {
                                    w.title = w.title.substring(0, 20) + '...';
                                }
                                return true;
                            }
                            return false;
                        })
                        .map((w, i) => (
                            <div
                                onClick={() => {
                                    navigate(`whiteboard/${w.id}`);
                                    setCurrentWhiteboard(w);
                                }}
                                key={i}
                                className={`cursor-pointer rounded-lg px-2 py-1 transition-all duration-300 hover:bg-zinc-800`}
                            >
                                <span className={`text-sm`}>{w.title}</span>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default SavedWhiteboards;
