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
