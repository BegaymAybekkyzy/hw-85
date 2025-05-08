import {createSlice} from "@reduxjs/toolkit";
import {ITrackAdmin} from "../../../types";
import {fetchAdminTracks, trackChangeOfStatus, trackDelete} from "./tracksAdminThunks.ts";
import {RootState} from "../../../app/store.ts";

interface tracksAdminState {
    tracks: ITrackAdmin[];
    fetchLoading: boolean;
    deleteLoading: boolean;
    changeLoading: boolean;
}

const initialState: tracksAdminState = {
    tracks: [],
    fetchLoading: false,
    deleteLoading: false,
    changeLoading: false,
}

export const selectAdminTracks = (state: RootState) => state.tracksAdmin.tracks;
export const selectAdminTracksFetchLoading = (state: RootState) => state.tracksAdmin.fetchLoading;
export const selectAdminTracksDeleteLoading = (state: RootState) => state.tracksAdmin.deleteLoading;
export const selectAdminTracksChangeLoading = (state: RootState) => state.tracksAdmin.changeLoading;

const trackAdminSlice = createSlice({
    name: "tracksAdmin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminTracks.pending, state => {
                state.fetchLoading = true;
            })
            .addCase(fetchAdminTracks.fulfilled, (state, {payload}) => {
                state.fetchLoading = false;
                state.tracks = payload;
            })
            .addCase(fetchAdminTracks.rejected, state => {
                state.fetchLoading = false;
            })

            .addCase(trackChangeOfStatus.pending, state => {
                state.changeLoading = true;
            })
            .addCase(trackChangeOfStatus.fulfilled, state => {
                state.changeLoading = false;
            })
            .addCase(trackChangeOfStatus.rejected, state => {
                state.changeLoading = false;
            })

            .addCase(trackDelete.pending, state => {
                state.deleteLoading = true;
            })
            .addCase(trackDelete.fulfilled, state => {
                state.deleteLoading = false;
            })
            .addCase(trackDelete.rejected, state => {
                state.deleteLoading = false;
            })
    }
});

export const tracksAdminReducer = trackAdminSlice.reducer;
