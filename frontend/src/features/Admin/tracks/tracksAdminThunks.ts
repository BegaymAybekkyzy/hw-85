import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosAPI.ts";
import {ITrackAdmin} from "../../../types";

export const fetchAdminTracks = createAsyncThunk<ITrackAdmin[], void>(
    "tracksAdmin/fetchAllTracks",
    async () => {
        const response = await axiosAPI("admin/tracks");
        return response.data;
    }
);

export const trackChangeOfStatus = createAsyncThunk<void, string>(
    "tracksAdmin/trackChangeOfStatus",
    async (trackId) => {
        await axiosAPI.patch(`admin/tracks/${trackId}/togglePublished`);
    }
);

export const trackDelete = createAsyncThunk<void, string>(
    "tracksAdmin/trackDelete",
    async (trackId) => {
        await axiosAPI.delete(`admin/tracks/${trackId}`);
    }
);