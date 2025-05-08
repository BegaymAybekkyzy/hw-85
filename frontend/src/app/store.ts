import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../features/Artists/artistsSlice.ts";
import {albumsReducer} from "../features/Albums/albumsSlice.ts";
import {trackReducer} from "../features/Tracks/tracksSlice.ts";
import {userReducer} from "../features/Users/usersSlice.ts";
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from "redux-persist";
import {trackHistoryReducer} from "../features/TrackHistory/trackHistorySlice.ts";
import axiosAPI from "../axiosAPI.ts";
import {AxiosHeaders, InternalAxiosRequestConfig} from "axios";
import {albumsAdminReducer} from "../features/Admin/albums/albumsAdminSlice.ts";
import {artistsAdminReducer} from "../features/Admin/artists/artistsAdminSLice.ts";
import {tracksAdminReducer} from "../features/Admin/tracks/tracksAdminSlice.ts";

const userConfig = {
    key: "store: users",
    storage,
    whitelist: ["user"]
}

const rootReducer = combineReducers({
    albumsAdmin: albumsAdminReducer,
    artistsAdmin: artistsAdminReducer,
    tracksAdmin: tracksAdminReducer,
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: trackReducer,
    users: persistReducer(userConfig, userReducer),
    trackHistory: trackHistoryReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware:( getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
            }
        }),
});

export const persistor = persistStore(store);

axiosAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    if (!token) return config;

    const headers = config.headers as AxiosHeaders;
    headers.set("Authorization", "Bearer " + token);
    return config;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;