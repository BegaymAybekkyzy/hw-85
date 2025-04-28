import {IArtistAPI} from "../../types.s.ts";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAllArtists} from "./artistsThunks.ts";
import {RootState} from "../../app/store.ts";

interface ArtistsState {
    allArtists: IArtistAPI[];
    fetchLoading: boolean;
}

const initialState: ArtistsState = {
    allArtists: [],
    fetchLoading: false,
}

export const selectAllArtists = (state: RootState) => state.artists.allArtists;
export const selectFetchLoadingArtist = (state: RootState) => state.artists.fetchLoading;

export const artistsSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllArtists.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllArtists.fulfilled, (state, {payload}) => {
                state.fetchLoading = false;
                state.allArtists = payload;
            })
            .addCase(fetchAllArtists.rejected, (state) => {
                state.fetchLoading = false;
            });
    }
});

export const artistsReducer = artistsSlice.reducer;