import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  selectAlbumUnpublished,
  selectFetchLoadingAlbum
} from './albumsSlice.ts';
import { fetchUnpublishedAlbums } from './albumsThunks.ts';
import Typography from '@mui/material/Typography';
import Loader from '../../components/UI/Loader/Loader.tsx';
import { Grid } from '@mui/material';
import AlbumItem from './components/AlbumItem.tsx';

const UnpublishedAlbums = () => {
  const dispatch = useAppDispatch();
  const unpublishedAlbums = useAppSelector(selectAlbumUnpublished);
  const loading = useAppSelector(selectFetchLoadingAlbum);

  useEffect(() => {
      dispatch(fetchUnpublishedAlbums());
  }, [dispatch]);

  let content: React.ReactNode = (
    <Typography variant={"h5"}>Your list of unpublished albums is empty</Typography>
  );

  if (loading) {
    content = (
      <Typography
        component="div"
        sx={{ height: "80hv", display: "flex", justifyContent: "center" }}
      >
        <Loader />
      </Typography>
    );
  }

  if (unpublishedAlbums.length > 0 && !loading) {
    content = (
      <Grid container spacing={2}>
        {unpublishedAlbums.map((album) => (
          <Grid key={album._id}>
            <AlbumItem album={album} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <div>
      {content}
    </div>
  );
};
export default UnpublishedAlbums;