import { IAddNoteResponseDto, INotesState, ISingleNote } from './types.ts';
import {
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
import {
    createCaseAsync,
    fetchNoteById,
    fetchNotesByUserId,
} from './notesApis.ts';

export const initialState: INotesState = {
    notes: [],
    fetchingNotes: false,
    currentNote: null,
};

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
        builder
            .addCase(
                fetchNotesByUserId.fulfilled,
                (state, action: PayloadAction<ISingleNote[]>) => {
                    state.notes = action.payload;
                    // since the notes are fetched, we can set the current note to the first note
                    state.currentNote = action.payload[0];
                },
            )
            .addCase(fetchNotesByUserId.pending, (state) => {
                // updating state for showing loading spinners
                state.fetchingNotes = true;
            })
            .addCase(
                createCaseAsync.fulfilled,
                (state, { payload }: PayloadAction<IAddNoteResponseDto>) => {
                    if (!payload.ok) {
                        /* empty -> // need to set error here */
                    }
                    console.log(state.notes);
                },
            )
            .addCase(
                fetchNoteById.fulfilled,
                (state, { payload }: PayloadAction<ISingleNote>) => {
                    state.currentNote = payload;
                    console.log(payload);
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
