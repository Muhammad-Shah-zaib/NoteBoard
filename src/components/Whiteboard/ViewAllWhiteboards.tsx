import CloseBtnSvg from '../../assets/button-svgs/CloseBtnSvg.tsx';
import Button from '../../shared/button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import EditBtnSvg from '../../assets/button-svgs/EditBtnSvg.tsx';
import {
    IDeleteWhiteboardRequestDto,
    ISingleWhiteboard,
} from '../../store/whiteboard/types.ts';
import { setCurrentWhiteboard } from '../../store/whiteboard/whiteboardSlice.ts';
import { deleteWhiteboard } from '../../store/whiteboard/whiteboardApis.ts';

export interface IViewAllWhiteboardProps {
    whiteboards: ISingleWhiteboard[];
    setCurrentWhiteboard: typeof setCurrentWhiteboard;
    deleteWhiteboard: typeof deleteWhiteboard;
}
const ViewAllWhiteboards = ({
    whiteboards,
    setCurrentWhiteboard,
    deleteWhiteboard,
}: IViewAllWhiteboardProps) => {
    // ROUTER HOOKS
    const navigate = useNavigate();

    // HANDLE CURRENT WHITEBOARD
    const handleCurrentWhiteboard = (whiteboard: ISingleWhiteboard) => {
        setCurrentWhiteboard(whiteboard);
        navigate(`/whiteboard`);
    };

    const handleDelete = (
        deleteWhiteboardRequestDto: IDeleteWhiteboardRequestDto,
    ) => {
        deleteWhiteboard(deleteWhiteboardRequestDto);
    };
    return (
        <div className="flex h-screen w-screen items-center justify-center md:h-full md:w-full">
            <div
                className={`grid w-full max-w-[1024px] justify-center gap-8 overflow-auto px-8 py-4 xs:grid-cols-2 md:grid-cols-4`}
            >
                {whiteboards.map((wb, i) => (
                    <div
                        onClick={() => handleCurrentWhiteboard(wb)}
                        key={wb.id ? wb.id : i}
                        className={`items-between flex h-full cursor-pointer flex-col justify-center gap-4 px-4 py-2 shadow-md shadow-secondary hover:bg-primary-700 hover:shadow-lg`}
                    >
                        <div
                            className={`flex w-full items-center justify-between gap-4`}
                        >
                            <p
                                className={`max-w-[60%] whitespace-normal break-words`}
                            >
                                {wb.title}
                            </p>
                            <div className={`flex flex-row-reverse gap-2`}>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        // DELETING
                                        if (wb.id) {
                                            handleDelete({
                                                whiteboardId: wb.id!,
                                                userId: 1,
                                            });
                                        }
                                    }}
                                    className={`rounded-full transition-all duration-200 hover:bg-red-500`}
                                >
                                    <CloseBtnSvg />
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setCurrentWhiteboard(wb);
                                        navigate(`/update-whiteboard/${wb.id}`);
                                    }}
                                    className={`px-0.5 transition-all duration-200 hover:bg-zinc-500`}
                                >
                                    <EditBtnSvg />
                                </Button>
                            </div>
                        </div>
                        <div className={`w-full`}>
                            <p className={`w-full text-end text-xs opacity-40`}>
                                Created At: 25-04-2025
                            </p>
                            <p className={`w-full text-end text-xs opacity-40`}>
                                Modified At At: 25-04-2025
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewAllWhiteboards;
