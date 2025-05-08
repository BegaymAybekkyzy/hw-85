import ArtistsForm from './copmonents/ArtistsForm.tsx';
import Typography from '@mui/material/Typography';

const AddArtist = () => {
  return (
    <main>
      <Typography
        variant="h3"
        color="textSecondary"
        textAlign="center"
        marginBottom={4}
      >Add artist</Typography>
      <ArtistsForm/>
    </main>
  );
};

export default AddArtist;