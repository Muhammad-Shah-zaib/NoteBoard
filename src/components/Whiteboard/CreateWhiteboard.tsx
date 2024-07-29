import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import pencilSvg from '../../assets/whitboard/pencil.svg';
import trashSvg from '../../assets/whitboard/trash.svg';
import saveSvg from '../../assets/whitboard/save.svg';
import downArrow from '../../assets/whitboard/down-arrow.svg';
import './whitboard.css';
import usePencil from '../../customHooks/usePencil.ts';
import Dialogue from '../../shared/components/dialogue/Dialogue.tsx';
import CreateWhiteboardDialogue from './CreateWhiteboardDialogue.tsx';
import { showComponent } from '../../utils/visibility.ts';
import { TCreateWhiteboardProps } from '../../containers/CreateWhiteboardContainer.tsx';

const CreateWhiteboard: React.FC<TCreateWhiteboardProps> = ({
    userDto,
    addWhiteboardAsync,
    currentWhiteboard,
    updateWhiteboard,
}) => {
    // ROUTER URL
    const url = window.location.href;

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
    const [currentColor, setCurrentColor] = useState<string>('black');

    // STATE FOR CANVAS HISTORY
    const [canvasStates, setCanvasStates] = useState<string[]>([]);
    const [canvasStateIndex, setCanvasStateIndex] = useState<number>(-1);

    // CUSTOM HOOK FOR PENCIL
    const { startPencil, stopPencil, keepDrawing } = usePencil();

    // USE LAYOUT EFFECT TO ADD EVENT LISTENERS
    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (currentWhiteboard) {
            // we need to load the image on the canvas
            loadImageOnCanvas(ctx, currentWhiteboard.imageUrl);
        }
        const handleMouseDown = (event: MouseEvent) => {
            ctx.strokeStyle = currentColor;
            startPencil(event, ctx, canvas);
        };

        const handleMouseMove = (event: MouseEvent) => {
            keepDrawing(event, ctx, canvas);
        };

        const handleMouseUp = (event: MouseEvent) => {
            stopPencil(event, ctx, canvas);

            // Update canvas states and index
            setCanvasStates((prevStates) => {
                const newStates = [...prevStates];
                if (canvasStateIndex < newStates.length - 1) {
                    newStates.length = canvasStateIndex + 1;
                }
                newStates.push(canvas.toDataURL());
                return newStates;
            });
            setCanvasStateIndex((prevIndex) => prevIndex + 1);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'z' || event.key === 'Z') {
                setCanvasStateIndex((prevIndex) => {
                    if (prevIndex > 0) {
                        const newIndex = prevIndex - 1;
                        const lastState = canvasStates[newIndex];
                        if (lastState) {
                            loadImageOnCanvas(ctx, lastState);
                        }
                        return newIndex;
                    } else {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        return -1;
                    }
                });
            } else if (event.key === 'r' || event.key === 'R') {
                setCanvasStateIndex((prevIndex) => {
                    if (prevIndex < canvasStates.length - 1) {
                        const newIndex = prevIndex + 1;
                        const nextState = canvasStates[newIndex];
                        if (nextState) {
                            loadImageOnCanvas(ctx, nextState);
                        }
                        return newIndex;
                    }
                    return prevIndex;
                });
            }
        };

        if (isDrawing) {
            canvas.addEventListener('mousedown', handleMouseDown);
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('keydown', handleKeyDown);
        } else {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('keydown', handleKeyDown);
        }

        // Cleanup function to remove listeners
        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        currentColor,
        isDrawing,
        canvasStates,
        canvasStateIndex,
        currentWhiteboard,
    ]); // Add dependencies

    const loadImageOnCanvas = (
        ctx: CanvasRenderingContext2D,
        imageUrl: string,
    ) => {
        const img = new Image();
        img.onload = () => {
            clearCanvas(ctx, {
                width: ctx.canvas.width,
                height: ctx.canvas.height,
            });
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
                // Getting the canvas URL
                const dataUrl = canvas.toDataURL('image/png');

                if (url.includes('create')) {
                    // DISPATCHING THE EVENT TO ADD THE WHITEBOARD
                    addWhiteboardAsync({
                        title: titleInput.value,
                        imageUrl: dataUrl,
                        userId: Number.parseInt(userDto.id),
                    });
                } else if (url.includes('update')) {
                    if (currentWhiteboard && currentWhiteboard.id)
                        updateWhiteboard({
                            title: titleInput.value,
                            imageUrl: dataUrl,
                            userId: userDto.id,
                            whiteboardId: Number.parseInt(currentWhiteboard.id),
                        });
                }
            }
        }
    };

    return (
        <div className="relative h-screen w-full p-2">
            <Dialogue id={whiteboardId}>
                <CreateWhiteboardDialogue
                    whiteboardId={whiteboardId}
                    titleInputRef={titleInputRef}
                    titleState={title}
                    setTitleState={setTitle}
                    createOrUpdateWhiteboard={createOrUpdate}
                />
            </Dialogue>
            <div className="h-full w-full overflow-auto rounded-lg bg-white">
                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    width={2560}
                    height={1440}
                    className={`pencil-cursor h-[200vh] w-[200vw] ${isDrawing ? 'drawing-cursor' : 'default-cursor'}`}
                ></canvas>

                {/* Menu bar at bottom center */}
                <div
                    id="open-menu-bar-btn"
                    onClick={() => {
                        const menuBar = document.getElementById(
                            'menu-bar',
                        ) as HTMLDivElement;
                        const openMenuBarBtn = document.getElementById(
                            'open-menu-bar-btn',
                        ) as HTMLDivElement;
                        if (!menuBar || !openMenuBarBtn) return;

                        openMenuBarBtn.classList.add('hidden');
                        menuBar.classList.remove('hidden');
                    }}
                    className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 cursor-pointer gap-4 bg-zinc-200 p-4 shadow-md shadow-zinc-400"
                >
                    <img
                        src={downArrow}
                        alt="open-Arrow"
                        className="rotate-180 transition-all duration-300"
                    />
                </div>
                <div
                    id="menu-bar"
                    className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4 bg-zinc-200 p-4 shadow-md shadow-zinc-400"
                >
                    {/* Tools */}
                    <div
                        onClick={() => setIsDrawing((prevState) => !prevState)}
                        className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300"
                    >
                        <img src={pencilSvg} alt="pencil" />
                    </div>
                    {/* COLOR */}
                    <div className="relative flex items-center">
                        <select
                            id="color-select"
                            onChange={(e) => setCurrentColor(e.target.value)}
                            className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300 text-black"
                        >
                            <option value="black">Black</option>
                            <option value="#22c55e">Green</option>
                            <option value="#0891b2">Sky</option>
                            <option value="#2563eb">Violet</option>
                            <option value="#facc15">Yellow</option>
                        </select>
                    </div>
                    <div
                        onClick={() => {
                            const menuBar = document.getElementById(
                                'menu-bar',
                            ) as HTMLDivElement;
                            const openMenuBarBtn = document.getElementById(
                                'open-menu-bar-btn',
                            ) as HTMLDivElement;

                            if (!menuBar || !openMenuBarBtn) return;

                            openMenuBarBtn.classList.remove('hidden');
                            menuBar.classList.add('hidden');

                            setIsDrawing(false);
                        }}
                        className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300"
                    >
                        <img src={downArrow} alt="pencil" />
                    </div>

                    <div
                        onClick={() => {
                            if (!canvasRef.current) return;
                            const canvas = canvasRef.current;
                            const ctx = canvas.getContext('2d');
                            if (!ctx) return;
                            clearCanvas(ctx, {
                                width: canvas.width,
                                height: canvas.height,
                            });
                        }}
                        className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300"
                    >
                        <img src={trashSvg} alt="clear" />
                    </div>
                    <div
                        onClick={() => showComponent(whiteboardId)}
                        className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300"
                    >
                        <img
                            src={saveSvg}
                            alt="save"
                            className="h-[40px] w-[40px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateWhiteboard;
