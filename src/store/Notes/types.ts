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

export interface IUpdateNoteRequest extends ISingleNote {
    id: number;
}
export interface IUpdateNoteResponse {
    message: string;
}
