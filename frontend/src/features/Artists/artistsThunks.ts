import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {IArtistAPI} from "../../types.s.ts";

export const fetchAllArtists = createAsyncThunk<IArtistAPI[], void>(
    "artists/fetchArtists",
    async () => {
        const response = await axiosAPI.get("artists");
        return response.data;
    }
);