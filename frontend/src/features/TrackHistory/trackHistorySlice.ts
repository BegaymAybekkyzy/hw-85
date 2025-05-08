import { RootState } from "../../app/store.ts";
import { createSlice } from "@reduxjs/toolkit";
import { IError, ITrackHistory } from "../../types";
import { addingTrackHistory, fetchTrackHistory } from "./trackHistoryThunks.ts";

interface TrackHistoryState {
  trackHistory: ITrackHistory[];
  loading: boolean;
  error: IError | null;
}

export const initialState: TrackHistoryState = {
  trackHistory: [],
  loading: false,
  error: null,
};

export const selectTrackHistory = (state: RootState) =>
  state.trackHistory.trackHistory;
export const selectTrackHistoryLoading = (state: RootState) =>
  state.trackHistory.loading;
export const selectTrackHistoryError = (state: RootState) =>
  state.trackHistory.error;

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
        state.error = null;
      })
      .addCase(fetchTrackHistory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.trackHistory = payload;
        state.error = null;
      })
      .addCase(fetchTrackHistory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || null;
      });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;
