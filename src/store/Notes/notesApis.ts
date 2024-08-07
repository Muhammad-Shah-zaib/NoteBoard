import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    IAddNoteRequestDto,
    IAddNoteResponseDto,
    IDeleteNoteRequestDto,
    IDeleteNoteResponseDto,
    INotesState,
    ISingleNote,
    IUpdateNoteRequest,
    IUpdateNoteResponse,
} from './types.ts';
import { NOTES_ENDPOINT } from '../../environment/environment.ts';
import { createNote, deleteNote, updateNoteAndNotes } from './NotesSlice.ts';
import { AppDispatch } from '../store.ts';

// ACTIONS
export const GET_NOTES_BY_USER_ID = 'notes/fetchNotesByUserId';
export const CREATE_NOTES_ACTION = 'notes/postNote';
export const UPDATE_NOTES_ACTION = 'notes/updateNote';
export const GET_NOTE_BY_ID = 'notes/getNoteById';
export const DELETE_NOTE_BY_ID = 'notes/deleteNoteById';

// THUNKS
export const fetchNotesByUserId = createAsyncThunk<
    ISingleNote[],
    number,
    { state: INotesState }
>(GET_NOTES_BY_USER_ID, async (id: number) => {
    // query params
    const queryParams: URLSearchParams = new URLSearchParams({
        userId: id.toString(),
    });
    const response = await fetch(`${NOTES_ENDPOINT}?${queryParams.toString()}`);
    return await response.json();
});

export const createCaseAsync = createAsyncThunk<
    IAddNoteResponseDto,
    IAddNoteRequestDto,
    { state: INotesState; dispatch: AppDispatch }
>(
    CREATE_NOTES_ACTION,
    async (requestBody: IAddNoteRequestDto, { dispatch }) => {
        // OPTIMISTIC UPDATE
        dispatch(createNote(requestBody));

        // REQUEST OPTIONSq
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        };

        const response = await fetch(NOTES_ENDPOINT, requestOptions);
        return response.json();
    },
);

export const updateNoteAsync = createAsyncThunk<
    IUpdateNoteResponse,
    IUpdateNoteRequest,
    { state: INotesState; dispatch: AppDispatch }
>(
    UPDATE_NOTES_ACTION,
    async ({ noteId, body, userId }: IUpdateNoteRequest, { dispatch }) => {
        // Optimistic update: update the local state immediately
        dispatch(
            updateNoteAndNotes({
                id: noteId,
                userId,
                ...body,
            }),
        );
        // REQUESTING FOR UPDATE
        // SEARCH PARAMS
        const searchParams: URLSearchParams = new URLSearchParams({
            userId: userId.toString(),
        });
        // REQUEST OPTIONS
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };

        // FETCH REQUEST
        const response = await fetch(
            `${NOTES_ENDPOINT}/${noteId}?${searchParams.toString()}`,
            requestOptions,
        );
        return response.json();
    },
);

export const fetchNoteById = createAsyncThunk<
    ISingleNote,
    { userId: number; noteId: number },
    { state: INotesState }
>(
    GET_NOTE_BY_ID,
    async ({ userId, noteId }: { userId: number; noteId: number }) => {
        const queryParams: URLSearchParams = new URLSearchParams({
            userId: userId.toString(),
        });
        const response = await fetch(
            `${NOTES_ENDPOINT}/${noteId}?${queryParams.toString()}`,
        );
        return await response.json();
    },
);

export const deleteNoteById = createAsyncThunk<
    IDeleteNoteResponseDto,
    IDeleteNoteRequestDto,
    { state: INotesState }
>(DELETE_NOTE_BY_ID, async ({ noteId, userId }, { dispatch }) => {
    // OPTIMISTIC UPDATE
    dispatch(deleteNote({ noteId, userId }));

    const requestOptions = {
        method: 'DELETE',
    };
    const searchParams = new URLSearchParams({
        userId: userId.toString(),
    });
    const response = await fetch(
        `${NOTES_ENDPOINT}/${noteId}?` + searchParams.toString(),
        requestOptions,
    );
    return await response.json();
});
