import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { ITrackForm } from "../../../types";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { addTrack } from "../tracksThunks.ts";
import { selectCreateLoadingTrack } from "../tracksSlice.ts";
import { selectAllArtists } from "../../Artists/artistsSlice.ts";
import { selectAlbumsByArtist } from "../../Albums/albumsSlice.ts";
import { fetchAllArtists } from "../../Artists/artistsThunks.ts";
import { fetchAlbumsByArtist } from "../../Albums/albumsThunks.ts";

const TrackForm = () => {
  const loading = useAppSelector(selectCreateLoadingTrack);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artists = useAppSelector(selectAllArtists);
  const albums = useAppSelector(selectAlbumsByArtist);

  const [form, setForm] = useState<ITrackForm>({
    album: "",
    title: "",
    duration: "",
  });

  useEffect(() => {
    dispatch(fetchAllArtists());
  }, [dispatch]);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addTrack(form));
    navigate("/");
  };

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "artist") {
      await dispatch(fetchAlbumsByArtist(value));
    }
    setForm({ ...form, [name]: value });
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Grid container spacing={2} marginBottom={3} justifyContent="center">
        <Grid size={9}>
          <TextField
            select
            disabled={loading}
            style={{ width: "100%" }}
            required
            onChange={onChangeInput}
            label="Artist"
            name="artist"
          >
            <MenuItem value="" disabled>
              Select artist
            </MenuItem>
            {artists.map((artist) => (
              <MenuItem value={artist._id} key={artist._id}>
                {artist.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={9}>
          <TextField
            select
            disabled={loading}
            style={{ width: "100%" }}
            value={form.album}
            required
            onChange={onChangeInput}
            label="Albums"
            name="album"
          >
            <MenuItem value="" disabled>
              Select albums
            </MenuItem>
            {albums.map((album) => (
              <MenuItem value={album._id} key={album._id}>
                {album.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={9}>
          <TextField
            fullWidth
            label="Title"
            disabled={loading}
            required
            name="title"
            onChange={onChangeInput}
            variant="outlined"
          />
        </Grid>

        <Grid size={9}>
          <TextField
            fullWidth
            label="Duration"
            disabled={loading}
            name="duration"
            required
            onChange={onChangeInput}
            variant="outlined"
          />
        </Grid>

        <Grid size={9}>
          <Button
            style={{
              backgroundColor: "#5F9EA0",
              display: "block",
              margin: "0 auto",
            }}
            variant="contained"
            type="submit"
            disabled={loading}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;
