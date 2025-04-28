import {RootState} from "../../app/store.ts";
import {createSlice} from "@reduxjs/toolkit";
import {ITrackHistory} from "../../types.s.ts";
import {addingTrackHistory, fetchTrackHistory} from "./trackHistoryThunks.ts";

interface TrackHistoryState {
    trackHistory: ITrackHistory[];
    loading: boolean;
}

export const initialState: TrackHistoryState = {
    trackHistory: [],
    loading: false,
}

export const selectTrackHistory = (state: RootState) => state.trackHistory.trackHistory;
export const selectTrackHistoryLoading = (state: RootState) => state.trackHistory.loading;

export const trackHistorySlice = createSlice({
    name: "trackHistory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addingTrackHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addingTrackHistory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addingTrackHistory.rejected, (state) => {
                state.loading = false;
            })

            .addCase(fetchTrackHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrackHistory.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.trackHistory = payload;
            })
            .addCase(fetchTrackHistory.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const trackHistoryReducer = trackHistorySlice.reducer;