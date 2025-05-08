import React from 'react';
import { IArtistAPI } from '../../../types';
import {
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
} from '@mui/material';
import { BASE_URL } from '../../../constants.ts';
import { useNavigate } from 'react-router-dom';
import NoImage from '../../../assets/no_Image.jpg';
import { nameRetention } from '../../Albums/albumsSlice.ts';
import { useAppDispatch } from '../../../app/hooks.ts';

interface Props {
  artist: IArtistAPI;
}

const ArtistCard: React.FC<Props> = ({artist}) => {
  let imagePath = NoImage;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (artist.photo) {
    imagePath = BASE_URL + '/' + artist.photo;
  }

  const redirect = async () => {
    dispatch(nameRetention(artist.name));
    await navigate(`/artist_albums/${artist._id}`);
  };

  return (
    <Card sx={{width: 345}}>
      <CardMedia sx={{height: 270}} image={imagePath} title={artist.name}/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {artist.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{color: '#5F9EA0'}} onClick={redirect}>
          Artist albums
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArtistCard;
