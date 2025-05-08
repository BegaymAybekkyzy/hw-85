import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { IAlbumForm, IArtistAPI } from '../../../types';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput.tsx';
import { selectAlbumCreateLoading } from '../albumsSlice.ts';
import { addAlbum } from '../albumsThunks.ts';

interface Props {
  artists: IArtistAPI[]
}

const AlbumForm: React.FC<Props> = ({artists}) => {
  const loading = useAppSelector(selectAlbumCreateLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<IAlbumForm>({
    artist: '',
    album_year: 0,
    title: "",
    cover: null,
  });

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addAlbum(form));
    navigate('/');
  };

  const fileInputChangeHandler = (
    eFile: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {files} = eFile.target;

    if (files) {
      setForm((prev) => ({...prev, cover: files[0]}));
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Grid container spacing={2} marginBottom={3} justifyContent="center">
        <Grid size={9}>
          <TextField
            select
            disabled={loading}
            style={{width: '100%'}}
            value={form.artist}
            required
            onChange={onChangeInput}
            label="Artist"
            name="artist"
          >
            <MenuItem value='' disabled>Select artist</MenuItem>
            {artists.map(artist => (
              <MenuItem value={artist._id} key={artist._id}>{artist.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={9}>
          <TextField
            fullWidth
            required
            label="Title"
            name="title"
            disabled={loading}
            onChange={onChangeInput}
            variant="outlined"/>
        </Grid>
        <Grid size={9}>
          <TextField
            fullWidth
            required
            label="Album year"
            disabled={loading}
            type={'number'}
            name="album_year"
            onChange={onChangeInput}
            variant="outlined"/>
        </Grid>
        <Grid size={9}>
          <FileInput
            name="cover"
            label="Cover"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid size={9}>
          <Button
            variant="contained"
            sx={{backgroundColor: '#5F9EA0'}}
            type="submit"
            disabled={loading}
          >Add</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlbumForm;