import { RootState } from "../../app/store.ts";
import { createSlice } from "@reduxjs/toolkit";
import { ITrackApi } from "../../types";
import { fetchTracksByAlbum } from "./tracksThunks.ts";

interface TrackState {
  tracksByArtist: ITrackApi[];
  fetchLoading: boolean;
}

export const initialState: TrackState = {
  tracksByArtist: [],
  fetchLoading: false,
};

export const selectTracks = (state: RootState) => state.tracks.tracksByArtist;
export const selectFetchLoadingTrack = (state: RootState) =>
  state.tracks.fetchLoading;

export const trackSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracksByAlbum.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTracksByAlbum.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      state.tracksByArtist = payload;
    });
    builder.addCase(fetchTracksByAlbum.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const trackReducer = trackSlice.reducer;
