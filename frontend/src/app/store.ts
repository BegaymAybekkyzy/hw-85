import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../features/Artists/artistsSlice.ts";
import {albumsReducer} from "../features/Albums/albumsSlice.ts";
import {trackReducer} from "../features/Tracks/tracksSlice.ts";
import {userReducer} from "../features/Users/usersSlice.ts";
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from "redux-persist";
import {trackHistoryReducer} from "../features/TrackHistory/trackHistorySlice.ts";

const userConfig = {
    key: "store: users",
    storage,
    whitelist: ["user"]
}

const rootReducer = combineReducers({
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
        })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;