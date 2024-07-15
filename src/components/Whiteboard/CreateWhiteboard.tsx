import { useId, useLayoutEffect, useRef, useState } from 'react';
import pencilSvg from '../../assets/whitboard/pencil.svg';
import trashSvg from '../../assets/whitboard/trash.svg';
import shareSvg from '../../assets/whitboard/share.svg';
import textSvg from '../../assets/whitboard/text.svg';
import './whitboard.css';
import usePencil from '../../customHooks/usePencil.ts';
import {
    addWhiteboardAsync,
    updateWhiteboard,
} from '../../store/whiteboard/whiteboardApis.ts';
import Dialogue from '../../shared/components/dialogue/Dialogue.tsx';
import CreateWhiteboardDialogue from './CreateWhiteboardDialogue.tsx';
import { showComponent } from '../../utils/visibility.ts';
import { ISingleWhiteboard } from '../../store/whiteboard/types.ts';

export interface createWhiteboardProps {
    addWhiteboardAsync: typeof addWhiteboardAsync;
    updateWhiteboard: typeof updateWhiteboard;
    loading: boolean;
    currentWhiteboard: ISingleWhiteboard | null;
}
const CreateWhiteboard = ({
    addWhiteboardAsync,
    currentWhiteboard,
    updateWhiteboard,
}: createWhiteboardProps) => {
    // ROUTER URL
    const url = window.location.href;

    // STORING THE STATES TO UNDO
    const canvasStates: string[] = [];
    let canvasStateIndex: number = currentWhiteboard ? 0 : -1;

    // STATE FOR TITLE INPUT
    const [title, setTitle] = useState<string>(
        currentWhiteboard ? currentWhiteboard.title : '',
    );
    const titleInputRef = useRef<HTMLInputElement>(null);

    // STATE FOR WHITEBOARD DIALOG
    const whiteboardId = useId();

    // REF FOR CANVAS
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // STATE FOR CURRENT COLOR
    let currentColor = 'black'; // State to hold the current drawing color

    // CUSTOM HOOK FOR PENCIL
    const { startPencil, stopPencil, keepDrawing } = usePencil();

    // USE LAYOUT EFFECT TO ADD EVENT LISTENERS
    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                clearCanvas(ctx, {
                    width: canvas.width,
                    height: canvas.height,
                });
                currentWhiteboard &&
                    loadImageOnCanvas(ctx, currentWhiteboard.imageUrl);
                canvas.addEventListener('mousedown', (event) => {
                    ctx.strokeStyle = currentColor;
                    ctx.strokeStyle = currentColor;
                    startPencil(event, ctx, canvas);
                });
                canvas.addEventListener('mousemove', (event) =>
                    keepDrawing(event, ctx, canvas),
                );
                canvas.addEventListener('mouseup', (event) => {
                    // STOP PENCIL
                    stopPencil(event, ctx, canvas);
                    // ADDING THE CURRENT DATA URL INTO UNDO STATES
                    if (canvasStateIndex < canvasStates.length - 1) {
                        canvasStates.length = canvasStateIndex + 1;
                    }
                    canvasStates.push(canvas.toDataURL());
                    canvasStateIndex += 1;
                });
                window.addEventListener('keydown', (event) => {
                    if (event.key === 'z' || event.key === 'Z') {
                        // UNDO
                        if (canvasStateIndex > 0) {
                            // GETTING THE LAST STATE
                            canvasStateIndex -= 1;
                            const lastState = canvasStates[canvasStateIndex];
                            if (lastState) {
                                // CLEARING THE CANVAS
                                clearCanvas(ctx, {
                                    width: canvas.width,
                                    height: canvas.height,
                                });
                                // DRAWING THE LAST STATE
                                loadImageOnCanvas(ctx, lastState);
                            }
                        } else {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            canvasStateIndex = -1;
                        }
                    } else if (event.key === 'r' || event.key === 'R') {
                        // REDO
                        if (canvasStateIndex < canvasStates.length - 1) {
                            // NOW WE CAN REDO
                            // GETTING THE NEXT STATE
                            canvasStateIndex += 1;
                            const nextState = canvasStates[canvasStateIndex];
                            if (nextState) {
                                // CLEARING THE CANVAS
                                clearCanvas(ctx, {
                                    width: canvas.width,
                                    height: canvas.height,
                                });
                                // DRAWING THE NEXT STATE
                                loadImageOnCanvas(ctx, nextState);
                            }
                        }
                    }
                });
            } else {
                console.error('Failed to get 2D context for canvas');
            }
        }
    }, [currentColor, currentWhiteboard]); // Include currentColor in dependencies to update stroke style when color changes
    const loadImageOnCanvas = (
        ctx: CanvasRenderingContext2D,
        imageUrl: string,
    ) => {
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
        img.src = imageUrl;
    };
    const clearCanvas = (
        ctx: CanvasRenderingContext2D,
        { width, height }: { width: number; height: number },
    ) => {
        ctx.clearRect(0, 0, width, height);
    };
    const createOrUpdate = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const titleInput = titleInputRef.current;
            if (titleInput && titleInput.value) {
                // getting the canvas url
                const dataUrl = canvas.toDataURL('image/png');

                if (url.includes('create')) {
                    // DISPATCHING THE EVENT TO ADD THE WHITEBOARD
                    addWhiteboardAsync({
                        title: titleInput.value,
                        imageUrl: dataUrl,
                        userId: 1,
                    });
                } else if (url.includes('update')) {
                    if (currentWhiteboard && currentWhiteboard.id)
                        updateWhiteboard({
                            title: titleInput.value,
                            imageUrl: dataUrl,
                            userId: 1,
                            whiteboardId: currentWhiteboard.id,
                        });
                }
            }
        }
    };

    return (
        <div className={`relative h-screen w-full p-2`}>
            <Dialogue id={whiteboardId}>
                <CreateWhiteboardDialogue
                    whiteboardId={whiteboardId}
                    titleInputRef={titleInputRef}
                    titleState={title}
                    setTitleState={setTitle}
                    createOrUpdateWhiteboard={createOrUpdate}
                />
            </Dialogue>
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
                    {/* COLOR */}
                    <div className={`relative flex items-center`}>
                        <select
                            id={`color-select`}
                            onChange={(e) => {
                                currentColor = e.target.value;
                            }}
                            className={`flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300 text-black`}
                        >
                            <option value={`black`}>Black</option>
                            <option value={`#22c55e`}>green</option>
                            <option value={`#0891b2`}>sky</option>
                            <option value={`#2563eb`}>violet</option>
                            <option value={`#facc15`}>Yellow</option>
                        </select>
                    </div>
                    <div
                        className={`flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300`}
                    >
                        <img src={trashSvg} alt={`pencil`} />
                    </div>
                    <div
                        onClick={() => showComponent(whiteboardId)}
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
