import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import { ITrackApi, ITrackForm } from "../../types";

export const fetchTracksByAlbum = createAsyncThunk<ITrackApi[], string>(
  "tracks/fetchTracksByAlbum",
  async (albumsId) => {
    const response = await axiosAPI(`tracks?album=${albumsId}`);
    return response.data;
  },
);

export const addTrack = createAsyncThunk<void, ITrackForm>(
  "tracks/addTrack",
  async (newTrack) => {
    await axiosAPI.post("tracks", newTrack);
  },
);

export const fetchUnpublishedTracks = createAsyncThunk<ITrackApi[], void>(
  "tracks/fetchUnpublishedTracks",
  async () => {
    const response = await axiosAPI.get("tracks/user");
    return response.data;
  },
);
