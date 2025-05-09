import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAlbumApi, IAlbumForm } from "../../types";
import axiosAPI from "../../axiosAPI.ts";

export const fetchAlbumsByArtist = createAsyncThunk<IAlbumApi[], string>(
  "albums/fetchAlbumsByArtist",
  async (artist_id) => {
    const response = await axiosAPI(`albums?artist=${artist_id}`);
    return response.data;
  },
);

export const fetchAlbumsById = createAsyncThunk<IAlbumApi, string>(
  "albums/fetchAlbumsById",
  async (album_id) => {
    const response = await axiosAPI(`albums/${album_id}`);
    return response.data;
  },
);

export const addAlbum = createAsyncThunk<void, IAlbumForm>(
  "albums/addAlbum",
  async (newAlbum) => {
    const formData = new FormData();
    const keys = Object.keys(newAlbum) as (keyof IAlbumForm)[];

    keys.forEach((key) => {
      const value = newAlbum[key] as string;
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosAPI.post("albums", formData);
  },
);

export const fetchUnpublishedAlbums = createAsyncThunk<IAlbumApi[], void>(
  "albums/fetchUnpublishedAlbums",
  async () => {
    const response = await axiosAPI.get("albums/user");
    return response.data;
  },
);
