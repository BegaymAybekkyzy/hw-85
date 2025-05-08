import {createSlice} from "@reduxjs/toolkit";
import {IArtistAdmin} from "../../../types";
import {artistChangeOfStatus, artistDelete, fetchAdminArtists} from "./artistsAdminThunks.ts";
import {RootState} from "../../../app/store.ts";

interface adminState {
    artists: IArtistAdmin[];
    fetchLoading: boolean;
    deleteLoading: boolean;
    changeLoading: boolean;
}

const initialState: adminState = {
    artists: [],
    fetchLoading: false,
    deleteLoading: false,
    changeLoading: false,
}

export const selectAdminArtists = (state: RootState) => state.artistsAdmin.artists;
export const selectAdminArtistFetchLoading = (state: RootState) => state.artistsAdmin.fetchLoading;
export const selectAdminArtistDeleteLoading = (state: RootState) => state.artistsAdmin.deleteLoading;
export const selectAdminArtistChangeLoading = (state: RootState) => state.artistsAdmin.changeLoading;

const artistsAdminSlice = createSlice({
    name: "artistsAdmin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminArtists.pending, state => {
                state.fetchLoading = true;
            })
            .addCase(fetchAdminArtists.fulfilled, (state, {payload}) => {
                state.fetchLoading = false;
                state.artists = payload;
            })
            .addCase(fetchAdminArtists.rejected, state => {
                state.fetchLoading = false;
            })

            .addCase(artistChangeOfStatus.pending, state => {
                state.changeLoading = true;
            })
            .addCase(artistChangeOfStatus.fulfilled, state => {
                state.changeLoading = false;
            })
            .addCase(artistChangeOfStatus.rejected, state => {
                state.changeLoading = false;
            })

            .addCase(artistDelete.pending, state => {
                state.deleteLoading = true;
            })
            .addCase(artistDelete.fulfilled, state => {
                state.deleteLoading = false;
            })
            .addCase(artistDelete.rejected, state => {
                state.deleteLoading = false;
            })
    }
});

export const artistsAdminReducer = artistsAdminSlice.reducer;