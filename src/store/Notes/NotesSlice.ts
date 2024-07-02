import { INotesState, ISingleNote } from './types.ts';
import {
    createAsyncThunk,
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
import { GET_NOTES_BY_ID_ENDPOINT } from '../../environment/environment.ts';

export const initialState: INotesState = {
    notes: [],
    currentNote: null,
};

const FETCH_NOTES_BY_ID_ACTION = 'notes/fetchNotesById';
export const fetchNotesById = createAsyncThunk<
    ISingleNote[],
    number,
    { state: INotesState }
>(FETCH_NOTES_BY_ID_ACTION, async (id: number) => {
    const response = await fetch(GET_NOTES_BY_ID_ENDPOINT + id);
    return await response.json();
});

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote: (state, action: PayloadAction<ISingleNote>) => {
            state.notes.push(action.payload);
            state.currentNote = action.payload;
        },
        updateCurrentNote: (state, action: PayloadAction<ISingleNote>) => {
            state.currentNote = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchNotesById.fulfilled,
            (state, action: PayloadAction<ISingleNote[]>) => {
                state.notes = action.payload;
                console.log(action);
            },
        );
    },
});
export const { createNote, updateCurrentNote } = notesSlice.actions;
export default notesSlice.reducer;

// selectors
export const notesSelector = createDraftSafeSelector(
    [(state: RootState) => state.notesSlice.notes],
    (notes) => notes,
);

export const currentNoteSelector = createDraftSafeSelector(
    [(state: RootState) => state.notesSlice.currentNote],
    (currentNote) => currentNote,
);
