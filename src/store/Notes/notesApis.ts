import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    IAddNoteRequestDto,
    IAddNoteResponseDto,
    INotesState,
    ISingleNote,
} from './types.ts';
import { NOTES_ENDPOINT } from '../../environment/environment.ts';
import { AppDispatch } from '../store.ts';
import { createNote } from './NotesSlice.ts';

export const GET_NOTES_BY_ID = 'notes/fetchNotesById';
export const fetchNotesById = createAsyncThunk<
    ISingleNote[],
    number,
    { state: INotesState }
>(GET_NOTES_BY_ID, async (id: number) => {
    // query params
    const queryParams: URLSearchParams = new URLSearchParams({
        userId: id.toString(),
    });
    const response = await fetch(`${NOTES_ENDPOINT}?${queryParams.toString()}`);
    return await response.json();
});

export const CREATE_NOTES_ACTION = 'notes/postNote';
export const createCaseAsync = createAsyncThunk<
    IAddNoteResponseDto,
    IAddNoteRequestDto,
    { dispatch: AppDispatch }
>(
    CREATE_NOTES_ACTION,
    async (requestBody: IAddNoteRequestDto, { dispatch }) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        };
        const response = await fetch(NOTES_ENDPOINT, requestOptions).then(
            (res) => res.json(),
        );
        if (response.ok && response.statusCode === 200)
            dispatch(createNote(response.note));

        return response;
    },
);
