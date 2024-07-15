// API TO ADD WHITEBOARD
import { WHITEBOARD_ENDPOINT } from '../../environment/environment.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    IAddWhiteboardRequestDto,
    IAddWhiteboardResponseDto,
    ISingleWhiteboard,
    IUpdateWhiteboardRequestDto,
    IUpdateWhiteboardResponseDto,
    IWhiteboardState,
} from './types.ts';

// ACTIONS
const ADD_WHITEBOARD = 'whiteboard/addWhiteboard';
const FETCH_WHITEBOARDS_WITH_USER_ID = 'whiteboard/fetchWhiteboardsWithUserId';
const UPDATE_WHITEBOARD = `whiteboard/updateWhiteboard`;

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

// fetch whiteboards with user id
export const fetchWhiteboardWithUserIdAsync = createAsyncThunk<
    ISingleWhiteboard[],
    { userId: number },
    { state: IWhiteboardState }
>(FETCH_WHITEBOARDS_WITH_USER_ID, async ({ userId }) => {
    // SEARCH PARAMS
    const searchParams: URLSearchParams = new URLSearchParams({
        userId: userId.toString(),
    });
    // REQUEST
    const response = await fetch(
        `${WHITEBOARD_ENDPOINT}?${searchParams.toString()}`,
    );

    // RETURNING JSON OBJ
    return await response.json();
});

// update whiteboard
export const updateWhiteboard = createAsyncThunk<
    IUpdateWhiteboardResponseDto,
    IUpdateWhiteboardRequestDto,
    { state: IWhiteboardState }
>(UPDATE_WHITEBOARD, async ({ userId, whiteboardId, title, imageUrl }) => {
    const requestParams: URLSearchParams = new URLSearchParams({
        userId: userId.toString(),
    });

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, imageUrl }),
    };

    const response = await fetch(
        WHITEBOARD_ENDPOINT +
            `/${whiteboardId}` +
            `?${requestParams.toString()}`,
        requestOptions,
    );

    return await response.json();
});
