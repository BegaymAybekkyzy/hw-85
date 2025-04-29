import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {IError, ITrackHistory} from "../../types.s.ts";
import {isAxiosError} from "axios";

export const addingTrackHistory = createAsyncThunk<
    void,
    {token: string, trackId: string}
>("trackHistory/addingTrackHistory",
    async ({trackId, token}) => {
        try {
            await axiosAPI.post("track_history", {track: trackId}, {headers: {Authorization: token}});
        }catch (error) {
            console.error(error);
        }
    }
);

export const fetchTrackHistory = createAsyncThunk<
    ITrackHistory[],
    string,
    { rejectValue: IError }
>("trackHistory/fetchTrackHistory",
    async (token, {rejectWithValue}) => {
        try {
            const response = await axiosAPI.get("track_history", {headers: {Authorization: token}});
            return response.data;
        }catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 401) {
                return rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);