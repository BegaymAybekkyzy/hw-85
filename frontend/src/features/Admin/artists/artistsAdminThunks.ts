import { createAsyncThunk } from "@reduxjs/toolkit";
import { IArtistAdmin } from "../../../types";
import axiosAPI from "../../../axiosAPI.ts";

export const fetchAdminArtists = createAsyncThunk<IArtistAdmin[], void>(
  "artistsAdmin/fetchAllArtists",
  async () => {
    const response = await axiosAPI("admin/artists");
    return response.data;
  },
);

export const artistChangeOfStatus = createAsyncThunk<void, string>(
  "artistsAdmin/artistChangeOfStatus",
  async (artistId) => {
    await axiosAPI.patch(`admin/artists/${artistId}/togglePublished`);
  },
);

export const artistDelete = createAsyncThunk<void, string>(
  "artistsAdmin/deleteArtist",
  async (artistId) => {
    await axiosAPI.delete(`admin/artists/${artistId}`);
  },
);
