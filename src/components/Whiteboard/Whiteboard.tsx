import { useLayoutEffect, useRef, useState } from 'react';
import pencilSvg from '../../assets/whitboard/pencil.svg';
import downArrowSvg from '../../assets/whitboard/down-arrow.svg';
import trashSvg from '../../assets/whitboard/trash.svg';
import shareSvg from '../../assets/whitboard/share.svg';
import textSvg from '../../assets/whitboard/text.svg';

const CreateWhiteboard = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentColor, setCurrentColor] = useState<string>('black'); // State to hold the current drawing color
    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                console.log('Canvas context initialized:', ctx);

                // Set initial stroke style
                ctx.strokeStyle = currentColor;

                // Function to get canvas coordinates from client coordinates
                const getCanvasCoordinates = (event: MouseEvent) => {
                    const canvasRect = canvas.getBoundingClientRect();
                    // Calculate the X and Y coordinates relative to the canvas
                    let x = event.clientX - canvasRect.left;
                    let y = event.clientY - canvasRect.top;

                    // Handle potential scaling issues (optional)
                    const scaleX = canvas.width / canvas.clientWidth;
                    const scaleY = canvas.height / canvas.clientHeight;
                    x *= scaleX;
                    y *= scaleY;

                    // Return the coordinates as an object
                    return { x, y };
                };

                canvas.addEventListener('mousedown', (event) => {
                    const { x, y } = getCanvasCoordinates(event);
                    console.log('MOUSE DOWN at:', x, y);
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    canvas.addEventListener('mousemove', onMouseMove);
                    canvas.addEventListener('mouseup', onMouseUp);
                });

                const onMouseMove = (event: MouseEvent) => {
                    const { x, y } = getCanvasCoordinates(event);
                    console.log('MOUSE MOVE at:', x, y);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                };

                const onMouseUp = () => {
                    console.log('MOUSE UP');
                    // lets save current canvas
                    canvas.removeEventListener('mousemove', onMouseMove);
                    canvas.removeEventListener('mouseup', onMouseUp);
                };
            } else {
                console.error('Failed to get 2D context for canvas');
            }
        }
    }, [currentColor]); // Include currentColor in dependencies to update stroke style when color changes

    return (
        <div className={`h-screen w-full p-2`}>
            <div
                className={`relative h-full w-full overflow-auto rounded-lg bg-white`}
            >
                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className={`h-[200vh] w-[200vw]`}
                    style={{ border: '1px solid black' }}
                ></canvas>

                {/* Menu bar at bottom center */}
                <div
                    className={`fixed bottom-4 left-1/2 flex -translate-x-1/2 gap-4 bg-zinc-200 p-4 shadow-md shadow-zinc-400`}
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
                        className={`flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-zinc-300`}
                    >
                        <img src={shareSvg} alt={`pencil`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateWhiteboard;
