import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import { ITrackHistory} from "../../types.s.ts";

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

export const fetchTrackHistory = createAsyncThunk<ITrackHistory[], string>("trackHistory/fetchTrackHistory",
    async (token) => {
        try {
            const response = await axiosAPI.get("track_history", {headers: {Authorization: token}});
            return response.data;
        }catch (error) {
            console.error(error);
        }
    }
);