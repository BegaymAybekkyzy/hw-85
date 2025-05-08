import Typography from '@mui/material/Typography';
import UnpublishedArtists from '../Artists/UnpublishedArtists.tsx';
import UnpublishedAlbums from '../Albums/UnpublishedAlbums.tsx';

const UnpublishedList = () => {
  return (
    <>
      <Typography marginBottom={3} variant="h3" color="textSecondary" component="div">Artists</Typography>
      <UnpublishedArtists />
      <hr style={{marginTop: 50}}/>
      <Typography marginBottom={3} variant="h3" color="textSecondary" component="div">Albums</Typography>
      <UnpublishedAlbums/>
    </>
  );
};

export default UnpublishedList;