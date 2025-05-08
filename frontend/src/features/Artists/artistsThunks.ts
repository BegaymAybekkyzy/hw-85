import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import { IArtistAPI, IArtistForm } from "../../types";

export const fetchAllArtists = createAsyncThunk<IArtistAPI[], void>(
  "artists/fetchArtists",
  async () => {
    const response = await axiosAPI.get("artists");
    return response.data;
  },
);

export const addArtist = createAsyncThunk<void, IArtistForm>(
  "artists/addArtist",
  async (newArtist) => {
    const formData = new FormData();
    const keys = Object.keys(newArtist) as (keyof IArtistForm)[];

    keys.forEach((key) => {
      const value = newArtist[key] as string;
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosAPI.post("artists", formData);
  },
);

export const fetchUnpublishedArtists = createAsyncThunk<IArtistAPI[], void>(
  "artists/fetchUnpublishedArtists",
  async () => {
    const response = await axiosAPI.get("artists/user");
    return response.data;
  },
);
