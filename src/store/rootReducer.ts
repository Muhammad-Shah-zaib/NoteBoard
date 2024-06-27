import { combineReducers } from '@reduxjs/toolkit';
import notesReducer from './Notes/NotesSlice.ts';

export const rootReducer = combineReducers({
    notes: notesReducer,
});
