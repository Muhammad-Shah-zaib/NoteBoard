import { combineReducers } from '@reduxjs/toolkit';
import notesReducer from './Notes/NotesSlice.ts';
import whiteboardReducer from './whiteboard/whiteboardSlice.ts';

export const rootReducer = combineReducers({
    notesSlice: notesReducer,
    whiteboardSlice: whiteboardReducer,
});
