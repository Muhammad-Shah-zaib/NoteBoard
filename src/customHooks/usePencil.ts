const usePencil = () => {
    let isDrawing = false;
    const getCanvasCoordinates = (
        event: MouseEvent,
        canvas: HTMLCanvasElement,
    ) => {
        // we need a state for drawing
        const canvasRect = canvas.getBoundingClientRect();
        // Calculate the X and Y coordinates relative to the canvas
        let x = Math.round(event.clientX) - Math.round(canvasRect.left);
        let y = Math.round(event.clientY) + 20 - Math.round(canvasRect.top);

        // Handle potential scaling issues (optional)
        const scaleX = canvas.width / canvas.clientWidth;
        const scaleY = canvas.height / canvas.clientHeight;
        x *= scaleX;
        y *= scaleY;

        // Return the coordinates as an object
        return { x, y };
    };

    const startPencil = (
        event: MouseEvent,
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement,
    ) => {
        isDrawing = true;
        ctx.lineWidth = 2;
        const { x, y } = getCanvasCoordinates(event, canvas);
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const keepDrawing = (
        event: MouseEvent,
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement,
    ) => {
        if (isDrawing) {
            const { x, y } = getCanvasCoordinates(event, canvas);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };

    const stopPencil = (
        event: MouseEvent,
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement,
    ) => {
        const { x, y } = getCanvasCoordinates(event, canvas);
        ctx.lineTo(x, y);
        ctx.stroke();
        // REMOVING THE EVENTS
        isDrawing = false;
    };

    return { getCanvasCoordinates, startPencil, keepDrawing, stopPencil };
};

export default usePencil;
