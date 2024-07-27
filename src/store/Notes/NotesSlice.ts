import {
    IAddNoteResponseDto,
    IDeleteNoteRequestDto,
    IDeleteNoteResponseDto,
    INotesState,
    ISingleNote,
} from './types.ts';
import {
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
import {
    createCaseAsync,
    deleteNoteById,
    fetchNoteById,
    fetchNotesByUserId,
    updateNoteAsync,
} from './notesApis.ts';

export const initialState: INotesState = {
    notes: [],
    fetchingNotes: false,
    currentNote: null,
    userDto: null,
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote: (state, action: PayloadAction<ISingleNote>) => {
            state.notes.unshift(action.payload);
            state.currentNote = action.payload;
        },
        updateCurrentNote: (state, action: PayloadAction<ISingleNote>) => {
            state.currentNote = action.payload;
        },
        deleteNote: (
            state,
            { payload: { noteId } }: PayloadAction<IDeleteNoteRequestDto>,
        ) => {
            // WE NEED TO DELETE THE note
            state.notes = state.notes.filter((n) => n.id !== noteId);
        },
        updateNoteAndNotes: (
            state,
            { payload }: PayloadAction<ISingleNote>,
        ) => {
            state.currentNote = payload;
            state.notes = state.notes.map((n) => {
                if (n.id === payload.id)
                    return {
                        ...n,
                        content: payload.content,
                        title: payload.title,
                    };
                return n;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchNotesByUserId.fulfilled,
                (state, action: PayloadAction<ISingleNote[]>) => {
                    state.notes = action.payload;
                    // since the notes are fetched, we can set the current note to the first note
                    if (!state.currentNote)
                        state.currentNote = action.payload[0];
                },
            )
            .addCase(fetchNotesByUserId.pending, (state) => {
                // updating state for showing loading spinners
                state.fetchingNotes = true;
            })
            .addCase(updateNoteAsync.fulfilled, (state, { payload }) => {
                if (payload.ok && payload.statusCode === 200) {
                    // we need to update the currentNote
                    state.currentNote = payload.note;
                    state.notes = payload.notes;
                }
            })
            .addCase(
                createCaseAsync.fulfilled,
                (state, { payload }: PayloadAction<IAddNoteResponseDto>) => {
                    if (payload.ok && payload.statusCode === 200) {
                        state.notes.unshift(payload.note);
                        state.currentNote = payload.note;
                    } else if (!payload.ok && payload.statusCode === 404) {
                        alert(payload.message);
                    }
                },
            )
            .addCase(
                fetchNoteById.fulfilled,
                (state, { payload }: PayloadAction<ISingleNote>) => {
                    state.currentNote = payload;
                    console.log(payload);
                },
            )
            .addCase(
                deleteNoteById.fulfilled,
                (
                    state,
                    {
                        payload: { notes, ok, statusCode },
                    }: PayloadAction<IDeleteNoteResponseDto>,
                ) => {
                    if (ok && statusCode === 200) {
                        state.notes = notes;
                    }
                },
            )
    },
});
// reducer
export default notesSlice.reducer;
// action creaters
export const { createNote, updateCurrentNote, updateNoteAndNotes, deleteNote } =
    notesSlice.actions;

// selectors
export const notesSelector = createDraftSafeSelector(
    [(state: RootState) => state.notesSlice.notes],
    (notes) => notes,
);

export const currentNoteSelector = createDraftSafeSelector(
    [(state: RootState) => state.notesSlice.currentNote],
    (currentNote) => currentNote,
);
