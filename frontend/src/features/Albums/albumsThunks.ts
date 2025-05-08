import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAlbumApi} from "../../types";
import axiosAPI from "../../axiosAPI.ts";

export const fetchAlbumsByArtist = createAsyncThunk<IAlbumApi[], string>(
    "albums/fetchAlbumsByArtist",
    async (artist_id) => {
        const response = await axiosAPI(`albums?artist=${artist_id}`)
        return response.data;
    }
);

export const fetchAlbumsById = createAsyncThunk<IAlbumApi, string>(
    "albums/fetchAlbumsById",
    async (album_id) => {
        const response = await axiosAPI(`albums/${album_id}`)
        return response.data;
    }
);