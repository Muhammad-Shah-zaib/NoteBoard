// API TO ADD WHITEBOARD
import { WHITEBOARD_ENDPOINT } from '../../environment/environment.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    IAddWhiteboardRequestDto,
    IAddWhiteboardResponseDto,
    IWhiteboardState,
} from './types.ts';

// ACTIONS
const ADD_WHITEBOARD = 'whiteboard/addWhiteboard';
export const addWhiteboardAsync = createAsyncThunk<
    IAddWhiteboardResponseDto,
    IAddWhiteboardRequestDto,
    { state: IWhiteboardState }
>(ADD_WHITEBOARD, async (request: IAddWhiteboardRequestDto) => {
    const requestParams: URLSearchParams = new URLSearchParams({
        userId: '1',
    });
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    };
    // we need to add the whiteboard to the database
    const response = await fetch(
        `${WHITEBOARD_ENDPOINT}?${requestParams.toString()}`,
        requestOptions,
    );

    return await response.json();
});
