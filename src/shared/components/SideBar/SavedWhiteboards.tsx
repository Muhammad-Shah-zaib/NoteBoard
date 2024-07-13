import './SideBar.css';
import WriteIcon from '../../../assets/button-svgs/WriteIcon.tsx';
import { Link } from 'react-router-dom';

const SavedWhiteboards = () => {
    const whiteboards = [
        { title: 'Mathematics Integration' },
        { title: 'LeetCode 1438' },
        { title: 'Partial Fractions' },
        { title: 'Partial Fractions' },
        { title: 'Partial Fractions' },
        { title: 'Partial Fractions' },
        { title: 'Partial Fractions' },
        { title: 'Partial Fractions' },
    ];
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
