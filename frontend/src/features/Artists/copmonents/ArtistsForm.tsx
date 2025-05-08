import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput.tsx";
import { IArtistForm } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { addArtist } from "../artistsThunks.ts";
import { selectCreateLoadingArtist } from "../artistsSlice.ts";

const ArtistsForm = () => {
  const loading = useAppSelector(selectCreateLoadingArtist);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<IArtistForm>({
    name: "",
    info: "",
    photo: null,
  });

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addArtist(form));
    navigate("/");
  };

  const fileInputChangeHandler = (
    eFile: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = eFile.target;

    if (files) {
      setForm((prev) => ({ ...prev, photo: files[0] }));
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Grid container spacing={2} marginBottom={3} justifyContent="center">
        <Grid size={9}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            required
            disabled={loading}
            onChange={onChangeInput}
            variant="outlined"
          />
        </Grid>
        <Grid size={9}>
          <TextField
            fullWidth
            label="Information"
            disabled={loading}
            rows={4}
            multiline
            name="info"
            onChange={onChangeInput}
            variant="outlined"
          />
        </Grid>
        <Grid size={9}>
          <FileInput
            name="photo"
            label="Photo"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid size={9}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#5F9EA0" }}
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

export default ArtistsForm;
