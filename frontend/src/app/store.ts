import {configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../features/Artists/artistsSlice.ts";
import {albumsReducer} from "../features/Albums/albumsSlice.ts";
import {trackReducer} from "../features/Tracks/tracksSlice.ts";

export const store = configureStore({
    reducer: {
        artist: artistsReducer,
        albums: albumsReducer,
        tracks: trackReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;