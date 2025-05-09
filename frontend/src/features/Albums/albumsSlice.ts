import { IAlbumApi } from "../../types";
import { RootState } from "../../app/store.ts";
import { createSlice } from "@reduxjs/toolkit";
import {
  addAlbum,
  fetchAlbumsByArtist,
  fetchAlbumsById,
  fetchUnpublishedAlbums,
} from "./albumsThunks.ts";

interface AlbumsState {
  albumsByArtist: IAlbumApi[];
  unpublishedAlbums: IAlbumApi[];
  albumsInfo: IAlbumApi | null;
  fetchLoading: boolean;
  createLoading: boolean;
  artistName: string;
}

export const initialState: AlbumsState = {
  albumsByArtist: [],
  fetchLoading: false,
  artistName: "Unknown",
  albumsInfo: null,
  unpublishedAlbums: [],
  createLoading: false,
};

export const selectAlbumsByArtist = (state: RootState) =>
  state.albums.albumsByArtist;
export const selectFetchLoadingAlbum = (state: RootState) =>
  state.albums.fetchLoading;
export const selectArtistName = (state: RootState) => state.albums.artistName;
export const selectAlbumInfo = (state: RootState) => state.albums.albumsInfo;
export const selectAlbumUnpublished = (state: RootState) =>
  state.albums.unpublishedAlbums;
export const selectAlbumCreateLoading = (state: RootState) =>
  state.albums.createLoading;

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    nameRetention: (state, action) => {
      state.artistName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsByArtist.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAlbumsByArtist.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.albumsByArtist = payload;
      })
      .addCase(fetchAlbumsByArtist.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchAlbumsById.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAlbumsById.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.albumsInfo = payload;
      })
      .addCase(fetchAlbumsById.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(addAlbum.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(addAlbum.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(addAlbum.rejected, (state) => {
        state.createLoading = false;
      })

      .addCase(fetchUnpublishedAlbums.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchUnpublishedAlbums.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.unpublishedAlbums = payload;
      })
      .addCase(fetchUnpublishedAlbums.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const { nameRetention } = albumsSlice.actions;
