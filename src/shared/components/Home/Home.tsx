import { THomeProps } from '../../../containers/HomeContainer';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import AddBtnSvg from '../../../assets/button-svgs/AddBtnSvg';
import Button from '../../button/Button';

function Home({
    notesDto,
    userDto,
    updateCurrentNote,
    setCurrentWhiteboard,
    whiteboardsDto,
}: THomeProps) {
    // router hooks
    const navigate = useNavigate();

    // notes
    const notes =
        notesDto.length === 0 ? (
            <h3
                className={`col-span-5 text-center text-xl font-bold text-primary-600`}
            >
                No saved notes
            </h3>
        ) : (
            notesDto.map((n, i) => {
                if (i < 5 && n) {
                    return (
                        <div
                            key={n.id}
                            onClick={() => {
                                updateCurrentNote(n);
                                navigate('/notes');
                            }}
                            className={`animate-border flex h-16 cursor-pointer items-center justify-center rounded-lg border-2 border-primary-700 p-4 shadow-lg shadow-secondary transition-all duration-300 md:h-20 lg:h-28`}
                        >
                            <h3 className="font-mono text-sm font-bold md:text-lg">
                                {n.title}
                            </h3>
                        </div>
                    );
                }
            })
        );
    // whiteborads
    const whiteboards =
        whiteboardsDto.length === 0 ? (
            <h3
                className={`col-span-5 text-center text-xl font-bold text-primary-600`}
            >
                No saved whtieboards
            </h3>
        ) : (
            whiteboardsDto.map((w, i) => {
                if (i < 5 && w)
                    return (
                        <div
                            onClick={() => {
                                setCurrentWhiteboard(w);
                                navigate(`/update-whiteboard/${w.id}`);
                            }}
                            key={w.id}
                            className={`animate-border flex h-28 cursor-pointer items-center justify-center rounded-lg border-2 border-primary-700 p-4 shadow-lg shadow-secondary transition-all duration-300`}
                        >
                            <h3 className="font-mono text-lg font-bold">
                                {w.title}
                            </h3>
                        </div>
                    );
            })
        );

    return (
        <div
            className={`flex h-screen flex-col items-center gap-4 overflow-y-auto overflow-x-hidden px-2 py-4 md:px-4 md:py-8 lg:gap-16 lg:px-8 lg:py-16`}
        >
            {/* WELCOME */}
            <div
                className={`w-full max-w-[1024px] border-b-2 border-primary-600`}
            >
                <h1 className="flex select-none items-center justify-center gap-4 py-2 text-center text-4xl font-bold text-primary-400">
                    <em>Welcome back</em>
                    <h2 className="hidden text-5xl md:block">
                        ,{' '}
                        {userDto.firstname[0].toUpperCase() +
                            userDto.firstname.slice(1).toLowerCase()}
                    </h2>
                </h1>
            </div>

            {/* NOTES CAROUSEL */}
            <div className="w-full max-w-[1024px] select-none">
                <div
                    className={`flex w-full items-center justify-between py-4 pr-4`}
                >
                    <h1 className={`text-5xl font-bold`}>Latest Notes</h1>
                    <Button
                        onClick={() => {
                            updateCurrentNote(null);
                            navigate('/create-notes');
                        }}
                        className={`animate-border border-2 border-transparent p-2 shadow-lg`}
                    >
                        {<AddBtnSvg />}
                    </Button>
                </div>
                {/* we need to render latest notes here */}
                <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 lg:grid-cols-5">
                    {notes}
                </div>
            </div>

            {/* WHITEBOARDS CAROSUEL */}
            <div className="w-full max-w-[1024px] select-none border-t-2 border-primary-600">
                <div
                    className={`flex w-full items-center justify-between py-4 pr-4`}
                >
                    <h1 className={`text-5xl font-bold`}>Whiteboards</h1>
                    <Button
                        onClick={() => {
                            setCurrentWhiteboard(null);
                            navigate('/create-whiteboard');
                        }}
                        className={`animate-border border-2 border-transparent p-2 shadow-lg`}
                    >
                        {<AddBtnSvg />}
                    </Button>
                </div>
                {/* we need to render latest whitebaords here */}
                <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 lg:grid-cols-5">
                    {whiteboards}
                </div>
            </div>
        </div>
    );
}

export default Home;
