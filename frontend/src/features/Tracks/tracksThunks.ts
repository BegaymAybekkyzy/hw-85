import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {ITrackApi} from "../../types.s.ts";

export const fetchTracksByAlbum = createAsyncThunk<ITrackApi[], string>(
    "tracks/fetchTracksByAlbum",
    async (albumsId) => {
        const response = await axiosAPI(`tracks?album=${albumsId}`)
        return response.data;
    }
);