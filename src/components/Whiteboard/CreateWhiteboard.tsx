import { useId, useLayoutEffect, useRef, useState } from 'react';
import pencilSvg from '../../assets/whitboard/pencil.svg';
import trashSvg from '../../assets/whitboard/trash.svg';
import saveSvg from '../../assets/whitboard/save.svg';
import downArrow from '../../assets/whitboard/down-arrow.svg';
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

    // STATE FOR DRAWING
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
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
                if (isDrawing) {
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
                                const lastState =
                                    canvasStates[canvasStateIndex];
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
                                ctx.clearRect(
                                    0,
                                    0,
                                    canvas.width,
                                    canvas.height,
                                );
                                canvasStateIndex = -1;
                            }
                        } else if (event.key === 'r' || event.key === 'R') {
                            // REDO
                            if (canvasStateIndex < canvasStates.length - 1) {
                                // NOW WE CAN REDO
                                // GETTING THE NEXT STATE
                                canvasStateIndex += 1;
                                const nextState =
                                    canvasStates[canvasStateIndex];
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
                }
            } else {
                console.error('Failed to get 2D context for canvas');
            }
        }
    }, [currentColor, currentWhiteboard, isDrawing]); // Include currentColor in dependencies to update stroke style when color changes
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
                    id={`open-menu-bar-btn`}
                    onClick={() => {
                        const menuBar = document.getElementById(
                            `menu-bar`,
                        ) as HTMLDivElement;
                        const openMenuBarBtn = document.getElementById(
                            'open-menu-bar-btn',
                        ) as HTMLDivElement;
                        if (!menuBar) return;
                        if (!openMenuBarBtn) return;

                        openMenuBarBtn.classList.add(`hidden`);
                        menuBar.classList.remove(`hidden`);
                    }}
                    className={`absolute bottom-4 left-1/2 hidden -translate-x-1/2 cursor-pointer gap-4 bg-zinc-200 p-4 shadow-md shadow-zinc-400`}
                >
                    <img
                        src={downArrow}
                        alt={`open-Arrow`}
                        className={`rotate-180 transition-all duration-300`}
                    />
                </div>
                <div
                    id={`menu-bar`}
                    className={`absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4 bg-zinc-200 p-4 shadow-md shadow-zinc-400`}
                >
                    {/* Tools */}
                    <div
                        onClick={() => {
                            setIsDrawing((state) => !state);
                        }}
                        className={`flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300`}
                    >
                        <img src={pencilSvg} alt={`pencil`} />
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
                        onClick={() => {
                            const menuBar = document.getElementById(
                                `menu-bar`,
                            ) as HTMLDivElement;
                            const openMenuBarBtn = document.getElementById(
                                'open-menu-bar-btn',
                            ) as HTMLDivElement;

                            //  VALIDATIONS
                            if (!menuBar) return;
                            if (!openMenuBarBtn) return;

                            // CHANGING THE VISIBILITY
                            openMenuBarBtn.classList.remove(`hidden`);
                            menuBar.classList.add(`hidden`);

                            // HANDLING DRAWING STATE
                            setIsDrawing(false);
                        }}
                        className={`flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300`}
                    >
                        <img src={downArrow} alt={`pencil`} />
                    </div>

                    <div
                        onClick={() => {
                            if (!canvasRef.current) return;
                            const canvas =
                                canvasRef.current as HTMLCanvasElement;
                            // since we have the canvas now we can get its context
                            const ctx = canvas.getContext(
                                '2d',
                            ) as CanvasRenderingContext2D;
                            if (!ctx) return;
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                        }}
                        className={`flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300`}
                    >
                        <img src={trashSvg} alt={`clear`} />
                    </div>
                    <div
                        onClick={() => showComponent(whiteboardId)}
                        className={`flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300`}
                    >
                        <img
                            src={saveSvg}
                            alt={`save`}
                            className={`h-[40px] w-[40px]`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateWhiteboard;
