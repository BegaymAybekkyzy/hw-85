import { IArtistAPI } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  addArtist, deleteArtist,
  fetchAllArtists,
  fetchUnpublishedArtists,
} from './artistsThunks.ts';
import { RootState } from "../../app/store.ts";

interface ArtistsState {
  allArtists: IArtistAPI[];
  fetchLoading: boolean;
  createLoading: boolean;
  unpublishedArtists: IArtistAPI[];
  deleteLoading: boolean;
}

const initialState: ArtistsState = {
  allArtists: [],
  unpublishedArtists: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const selectAllArtists = (state: RootState) => state.artists.allArtists;
export const selectUnpublishedArtists = (state: RootState) =>
  state.artists.unpublishedArtists;
export const selectFetchLoadingArtist = (state: RootState) =>
  state.artists.fetchLoading;

export const selectCreateLoadingArtist = (state: RootState) =>
  state.artists.createLoading;

export const selectDeleteLoadingArtist = (state: RootState) =>
  state.artists.deleteLoading;

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArtists.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAllArtists.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.allArtists = payload;
      })
      .addCase(fetchAllArtists.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchUnpublishedArtists.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchUnpublishedArtists.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.unpublishedArtists = payload;
      })
      .addCase(fetchUnpublishedArtists.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(addArtist.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(addArtist.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(addArtist.rejected, (state) => {
        state.createLoading = false;
      })

      .addCase(deleteArtist.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteArtist.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;
