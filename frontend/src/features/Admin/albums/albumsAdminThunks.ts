import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosAPI.ts";
import {IAlbumAdmin} from "../../../types";

export const fetchAdminAlbums = createAsyncThunk<IAlbumAdmin[], void>(
    "albumsAdmin/fetchAllAlbums",
    async () => {
        const response = await axiosAPI("admin/albums");
        return response.data;
    }
);

export const albumChangeOfStatus = createAsyncThunk<void, string>(
    "albumsAdmin/albumChangeOfStatus",
    async (albumId) => {
        await axiosAPI.patch(`admin/albums/${albumId}/togglePublished`);
    }
);

export const albumDelete = createAsyncThunk<void, string>(
    "albumsAdmin/albumDelete",
    async (albumId) => {
        await axiosAPI.delete(`admin/albums/${albumId}`);
    }
)