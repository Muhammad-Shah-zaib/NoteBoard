import { INotesState, ISingleNote } from './types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const str =
    '# Table of Contents\n' +
    '\n' +
    '1. [Introduction to Redux Core](#introduction-to-redux-core)\n' +
    '2. [Understanding createStore](#understanding-createstore)\n' +
    '3. [Additional Redux Methods](#additional-redux-methods)\n' +
    '\n' +
    '# Introduction to Redux Core\n' +
    '\n' +
    'Redux core is a predictable state container for JavaScript apps, featuring a unidirectional data flow. It revolves around three core principles: single source of truth, state is read-only, and changes are made with pure functions.\n' +
    '\n' +
    '> Redux core contains 5 main methods:\n' +
    '\n' +
    '- `Compose` (helps to compose different methods)\n' +
    '- `CreateStore` (creates the Redux store)\n' +
    '- `combineReducers` (combines multiple reducers into a single reducer)\n' +
    '\n' +
    '# Understanding createStore\n' +
    '\n' +
    "`createStore` is one of the main methods in Redux. It's used to create a Redux store that holds the complete state tree of your app. The store is the single source of truth and provides methods to:\n" +
    '- Retrieve the current state (`getState()`)\n' +
    '- Dispatch actions to change state (`dispatch(action)`)\n' +
    '- Register listeners via `store.subscribe(listener)`\n' +
    '\n' +
    '```javascript\n' +
    'const store = createStore(rootReducer);\n' +
    'export type RootState = ReturnType<typeof store.getState>;\n' +
    'export type AppDispatch = typeof store.dispatch;\n' +
    '```\n\n' +
    '\n' +
    '## Additional Redux Methods\n' +
    '\n' +
    '> [!Tip]\n> Apart from `createStore`, Redux provides several other utility methods:\n' +
    '- `applyMiddleware`: Applies middleware to the dispatch process\n' +
    "- `bindActionCreators`: Binds action creators to the store's dispatch method\n" +
    '- `createSelector`: Creates memoized selectors for efficient state access\n' +
    '\n' +
    "These methods enhance Redux's functionality and flexibility, making it easier to manage application state in large-scale JavaScript applications.\n";

const obj = {
    title: 'Redux Core',
    content: str,
};
export const initialState: INotesState = {
    notes: [],
    currentNote: obj,
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote: (state, action: PayloadAction<ISingleNote>) => {
            state.notes.push(action.payload);
            state.currentNote = action.payload;
        },
    },
});

export const { createNote } = notesSlice.actions;
export default notesSlice.reducer;
