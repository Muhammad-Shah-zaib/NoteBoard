import { combineReducers } from '@reduxjs/toolkit';
import notesReducer from './Notes/NotesSlice.ts';
import whiteboardReducer from './whiteboard/whiteboardSlice.ts';
import usersReducer from './Users/UsersSlice.ts';

export const rootReducer = combineReducers({
    usersSlice: usersReducer,
    notesSlice: notesReducer,
    whiteboardSlice: whiteboardReducer,
});
