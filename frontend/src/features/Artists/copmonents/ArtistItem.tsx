import React from "react";
import { IArtistAPI } from "../../../types";
import NoImage from "../../../assets/no_Image.jpg";
import { BASE_URL } from "../../../constants.ts";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box, Button,
} from '@mui/material';

interface Props {
  artist: IArtistAPI;
  onDeleteArtist: (id: string) => void;
  loading?: boolean;
}

const ArtistItem: React.FC<Props> = ({ artist, onDeleteArtist, loading = false }) => {
  let imagePath = NoImage;

  if (artist.photo) {
    imagePath = BASE_URL + "/" + artist.photo;
  }

  return (
    <Card sx={{ display: "flex", height: 150 }}>
      <CardMedia
        component="img"
        sx={{ width: 150, height: 150, objectFit: "cover" }}
        image={imagePath}
        title={artist.name}
      />

      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {artist.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {artist.info || "No description provided."}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography sx={{ color: "#a05f5f" }}>Not published</Typography>
          <Button
            sx={{ color: "#a05f5f" }}
            onClick={() => onDeleteArtist(artist._id)}
            disabled={loading}
          >Delete</Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default ArtistItem;
