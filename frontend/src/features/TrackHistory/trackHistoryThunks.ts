import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {IError, ITrackHistory} from "../../types";
import {isAxiosError} from "axios";

export const addingTrackHistory = createAsyncThunk<void, string>(
    "trackHistory/addingTrackHistory",
    async (trackId) => {
        try {
            await axiosAPI.post("track_history", {track: trackId});
        } catch (error) {
            console.error(error);
        }
    }
);

export const fetchTrackHistory = createAsyncThunk<
    ITrackHistory[],
    void,
    { rejectValue: IError }
>("trackHistory/fetchTrackHistory",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosAPI.get("track_history");
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 401) {
                return rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);