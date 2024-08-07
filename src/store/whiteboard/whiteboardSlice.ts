import {
    IAddWhiteboardResponseDto,
    IDeleteWhiteboardResponseDto,
    ISingleWhiteboard,
    IUpdateWhiteboardResponseDto,
    IWhiteboardState,
} from './types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addWhiteboardAsync,
    deleteWhiteboard,
    fetchWhiteboardWithUserIdAsync,
    updateWhiteboard,
} from './whiteboardApis.ts';

const initialState: IWhiteboardState = {
    whiteboards: [],
    currentWhiteboard: null,
    fetchingWhiteboards: false,
};

// SLICE
const whiteboardSlice = createSlice({
    name: 'whiteboard',
    initialState,
    reducers: {
        setCurrentWhiteboard: (
            state,
            { payload }: PayloadAction<ISingleWhiteboard | null>,
        ) => {
            state.currentWhiteboard = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                addWhiteboardAsync.fulfilled,
                (
                    state,
                    { payload }: PayloadAction<IAddWhiteboardResponseDto>,
                ) => {
                    if (payload.ok && payload.statusCode === 200) {
                        state.whiteboards = payload.whiteboards;
                        state.currentWhiteboard = payload.whiteboard;
                    }
                },
            )
            .addCase(
                fetchWhiteboardWithUserIdAsync.fulfilled,
                (state, { payload }: PayloadAction<ISingleWhiteboard[]>) => {
                    // UPDATING WHITEBAORDS
                    state.whiteboards = payload;

                    // UPDATING CURRENT WHITEBOARD
                    if (!state.currentWhiteboard && payload.length > 0)
                        state.currentWhiteboard = payload[0];
                },
            )
            .addCase(
                updateWhiteboard.fulfilled,
                (
                    state,
                    { payload }: PayloadAction<IUpdateWhiteboardResponseDto>,
                ) => {
                    if (payload.ok && payload.statusCode === 200) {
                        state.whiteboards = payload.whiteboards;
                        state.currentWhiteboard = payload.whiteboard;
                    }
                },
            )
            .addCase(
                deleteWhiteboard.fulfilled,
                (
                    state,
                    { payload }: PayloadAction<IDeleteWhiteboardResponseDto>,
                ) => {
                    state.whiteboards = payload.whiteboards;
                },
            );
    },
});

export default whiteboardSlice.reducer;

export const { setCurrentWhiteboard } = whiteboardSlice.actions;
