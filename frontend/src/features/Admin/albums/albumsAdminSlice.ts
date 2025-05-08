import {createSlice} from "@reduxjs/toolkit";
import {IAlbumAdmin} from "../../../types";
import {albumChangeOfStatus, albumDelete, fetchAdminAlbums} from "./albumsAdminThunks.ts";
import {RootState} from "../../../app/store.ts";

interface adminState {
    fetchLoading: boolean;
    deleteLoading: boolean;
    changeLoading: boolean;
    albums: IAlbumAdmin[];
}

const initialState: adminState = {
    albums: [],
    fetchLoading: false,
    deleteLoading: false,
    changeLoading: false,
}

export const selectAdminAlbums = (state: RootState) => state.albumsAdmin.albums;
export const selectAdminAlbumFetchLoading = (state: RootState) => state.albumsAdmin.fetchLoading;
export const selectAdminAlbumDeleteLoading = (state: RootState) => state.albumsAdmin.deleteLoading;
export const selectAdminAlbumChangeLoading = (state: RootState) => state.albumsAdmin.changeLoading;

const albumsAdminSlice = createSlice({
    name: "albumsAdmin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminAlbums.pending, state => {
                state.fetchLoading = true;
            })
            .addCase(fetchAdminAlbums.fulfilled, (state, {payload}) => {
                state.fetchLoading = false;
                state.albums = payload;
            })
            .addCase(fetchAdminAlbums.rejected, state => {
                state.fetchLoading = false;
            })

            .addCase(albumChangeOfStatus.pending, state => {
                state.changeLoading = true;
            })
            .addCase(albumChangeOfStatus.fulfilled, state => {
                state.changeLoading = false;
            })
            .addCase(albumChangeOfStatus.rejected, state => {
                state.changeLoading = false;
            })

            .addCase(albumDelete.pending, state => {
                state.deleteLoading = true;
            })
            .addCase(albumDelete.fulfilled, state => {
                state.deleteLoading = false;
            })
            .addCase(albumDelete.rejected, state => {
                state.deleteLoading = false;
            })
    }
});

export const albumsAdminReducer = albumsAdminSlice.reducer;