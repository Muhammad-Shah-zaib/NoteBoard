import { useLayoutEffect, useRef, useState } from 'react';
import pencilSvg from '../../assets/whitboard/pencil.svg';
import downArrowSvg from '../../assets/whitboard/down-arrow.svg';
import trashSvg from '../../assets/whitboard/trash.svg';
import shareSvg from '../../assets/whitboard/share.svg';
import textSvg from '../../assets/whitboard/text.svg';
import './whitboard.css';
import usePencil from '../../customHooks/usePencil.ts';
import { addWhiteboardAsync } from '../../store/whiteboard/whiteboardApis.ts';
import { useAppDispatch } from '../../store/store.ts';

const CreateWhiteboard = () => {
    const dispatch = useAppDispatch();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentColor] = useState<string>('black'); // State to hold the current drawing color
    const { startPencil, stopPencil, keepDrawing } = usePencil();
    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.addEventListener('mousedown', (event) =>
                    startPencil(event, ctx, canvas),
                );
                canvas.addEventListener('mousemove', (event) =>
                    keepDrawing(event, ctx, canvas),
                );
                canvas.addEventListener('mouseup', (event) =>
                    stopPencil(event, ctx, canvas),
                );
            } else {
                console.error('Failed to get 2D context for canvas');
            }
        }
    }, [currentColor]); // Include currentColor in dependencies to update stroke style when color changes

    const handleSave = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            // getting the canvas url
            const dataUrl = canvas.toDataURL('image/png');
            // since we have the url we can send the reqeust as follows
            dispatch(
                addWhiteboardAsync({
                    title: 'whiteboard',
                    imageUrl: dataUrl,
                    userId: 1,
                }),
            );
        }
    };

    return (
        <div className={`relative h-screen w-full p-2`}>
            <div className={`h-full w-full overflow-auto rounded-lg bg-white`}>
                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    width={2560}
                    height={1440}
                    className={`pencil-cursor h-[200vh] w-[200vw]`}
                ></canvas>

                {/* Menu bar at bottom center */}
                <div
                    className={`absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4 bg-zinc-200 p-4 shadow-md shadow-zinc-400`}
                >
                    {/* Tools */}
                    <div
                        className={`flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300`}
                    >
                        <img src={pencilSvg} alt={`pencil`} />
                    </div>
                    <div
                        className={`flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300`}
                    >
                        <img src={textSvg} alt={`pencil`} />
                    </div>
                    <div
                        className={`flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300`}
                    >
                        <img src={downArrowSvg} alt={`pencil`} />
                    </div>
                    <div
                        className={`flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300`}
                    >
                        <img src={trashSvg} alt={`pencil`} />
                    </div>
                    <div
                        onClick={handleSave}
                        className={`flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300`}
                    >
                        <img src={shareSvg} alt={`share`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateWhiteboard;
