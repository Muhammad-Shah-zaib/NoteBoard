export interface ISingleNote {
    id?: number;
    title: string;
    content: string;
}
export interface INotesState {
    notes: ISingleNote[];
    currentNote: ISingleNote;
}
