export interface ISingleNote {
    id?: number;
    title: string;
    content: string;
    userId: number;
}
export interface INotesState {
    notes: ISingleNote[];
    currentNote: ISingleNote | null;
}
