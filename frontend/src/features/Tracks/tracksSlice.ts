import { RootState } from "../../app/store.ts";
import { createSlice } from "@reduxjs/toolkit";
import { ITrackApi } from "../../types";
import {
  addTrack, deleteTrack,
  fetchTracksByAlbum,
  fetchUnpublishedTracks,
} from './tracksThunks.ts';

interface TrackState {
  tracksByArtist: ITrackApi[];
  fetchLoading: boolean;
  unpublishedTracks: ITrackApi[];
  createLoading: boolean;
  deleteLoading: boolean;
}

export const initialState: TrackState = {
  tracksByArtist: [],
  fetchLoading: false,
  unpublishedTracks: [],
  createLoading: false,
  deleteLoading: false,
};

export const selectTracks = (state: RootState) => state.tracks.tracksByArtist;
export const selectFetchLoadingTrack = (state: RootState) =>
  state.tracks.fetchLoading;
export const selectCreateLoadingTrack = (state: RootState) =>
  state.tracks.createLoading;
export const selectUnpublishedTrack = (state: RootState) =>
  state.tracks.unpublishedTracks;
export const selectDeleteLoadingTrack = (state: RootState) =>
  state.tracks.deleteLoading;

export const trackSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracksByAlbum.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchTracksByAlbum.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.tracksByArtist = payload;
      })
      .addCase(fetchTracksByAlbum.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(addTrack.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(addTrack.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(addTrack.rejected, (state) => {
        state.createLoading = false;
      })

      .addCase(fetchUnpublishedTracks.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchUnpublishedTracks.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.unpublishedTracks = payload;
      })
      .addCase(fetchUnpublishedTracks.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(deleteTrack.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteTrack.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.deleteLoading = false;
      })
  },
});

export const trackReducer = trackSlice.reducer;
