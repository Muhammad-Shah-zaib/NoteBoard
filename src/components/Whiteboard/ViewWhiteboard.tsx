import { ISingleWhiteboard } from '../../store/whiteboard/types.ts';
import { useEffect, useRef } from 'react';

export interface IViewWhiteboardProps {
    currentWhiteboard: ISingleWhiteboard | null;
}
const ViewWhiteboard = ({ currentWhiteboard }: IViewWhiteboardProps) => {
    // HOOKS
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // USE EFFECT HOOK
    useEffect(() => {
        console.log(currentWhiteboard);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // NOW WE CAN LOAD OUT IMAGE
        if (currentWhiteboard)
            loadImageOnCanvas(ctx, currentWhiteboard.imageUrl);
    }, [currentWhiteboard]);
    return (
        <div className={`h-[100vh] w-full overflow-auto bg-white`}>
            <canvas
                ref={canvasRef}
                id={'whiteboard-canvas'}
                height={1440}
                width={2560}
                className={`h-[200vh] w-[200vw]`}
            />
        </div>
    );
};

export default ViewWhiteboard;

function loadImageOnCanvas(ctx: CanvasRenderingContext2D, imageUrl: string) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const image = new Image();
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    };
    image.src = imageUrl;
}
