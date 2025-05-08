import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAllArtists } from '../Artists/artistsSlice.ts';
import { fetchAllArtists } from '../Artists/artistsThunks.ts';
import AlbumForm from './components/AlbumForm.tsx';
import Typography from '@mui/material/Typography';

const AddAlbum = () => {
  const artists = useAppSelector(selectAllArtists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllArtists());
  }, [dispatch]);

  return (
    <div>
      <Typography
        variant="h3"
        color="textSecondary"
        textAlign="center"
        marginBottom={4}
      >Add album</Typography>
      <AlbumForm artists={artists} />
    </div>
  );
};

export default AddAlbum;