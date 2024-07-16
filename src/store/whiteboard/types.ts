interface response {
    statusCode: number;
    ok: boolean;
    message: string;
    error: string[];
}
interface request {
    whiteboardId: number;
    userId: number;
}
export interface IRequestOptopns {
    method: string;
    headers?: {
        'Content-Type': 'application/json';
    };
    body?: string;
}

export interface IWhiteboardState {
    whiteboards: ISingleWhiteboard[];
    currentWhiteboard: ISingleWhiteboard | null;
    fetchingWhiteboards: boolean;
}
export interface ISingleWhiteboard {
    id?: number;
    title: string;
    imageUrl: string;
    userId: number;
}

export interface IAddWhiteboardRequestDto {
    title: string;
    imageUrl: string;
    userId: number;
}

export interface IAddWhiteboardResponseDto {
    statusCode: number;
    ok: boolean;
    message: string;
    error: string[];
    whiteboard: ISingleWhiteboard;
    whiteboards: ISingleWhiteboard[];
}

export interface IUpdateWhiteboardRequestDto {
    title: string;
    imageUrl: string;
    userId: number;
    whiteboardId: number;
}

export interface IUpdateWhiteboardResponseDto extends response {
    whiteboard: ISingleWhiteboard;
    whiteboards: ISingleWhiteboard[];
}

export interface IDeleteWhiteboardResponseDto extends response {
    whiteboard: ISingleWhiteboard;
    whiteboards: ISingleWhiteboard[];
}

export interface IDeleteWhiteboardRequestDto extends request {}
