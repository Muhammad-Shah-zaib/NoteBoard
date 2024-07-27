import { IUserDto } from "../Users/types";

export interface ISingleNote {
    id?: number;
    title: string;
    content: string;
    userId: number;
}

export interface INotesState {
    notes: ISingleNote[];
    fetchingNotes: boolean;
    currentNote: ISingleNote | null;
    userDto: IUserDto | null;
}
export interface IAddNoteRequestDto extends ISingleNote {}

export interface IAddNoteResponseDto {
    statusCode: number;
    ok: boolean;
    message: string;
    note: ISingleNote;
    error: string[];
}

export interface IUpdateNoteRequest {
    noteId: number;
    userId: number;
    body: {
        title: string;
        content: string;
    };
}

export interface IUpdateNoteResponse {
    message: string;
    ok: boolean;
    statusCode: number;
    error: string[];
    note: ISingleNote;
    notes: ISingleNote[];
}

export interface IDeleteNoteResponseDto {
    ok: boolean;
    statusCode: number;
    message: string;
    error: string[];
    notes: ISingleNote[];
}

export interface IDeleteNoteRequestDto {
    noteId: number;
    userId: number;
}
