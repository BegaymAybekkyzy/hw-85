import React from "react";
import { IAlbumApi } from "../../../types";
import {
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
} from "@mui/material";
import { BASE_URL } from "../../../constants.ts";
import NoImage from "../../../assets/no_Image.jpg";
import { NavLink } from "react-router-dom";

interface Props {
  album: IAlbumApi;
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  let imagePath = NoImage;

  if (album.cover) {
    imagePath = BASE_URL + "/" + album.cover;
  }

  return (
    <Card sx={{ width: 345 }}>
      <CardMedia sx={{ height: 270 }} image={imagePath} title={album.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {album.title}
        </Typography>
        <Typography variant="body2">Album year: {album.album_year}</Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ color: "#5F9EA0" }}
          component={NavLink}
          to={`/album_tracks/${album._id}`}
        >
          Track list
        </Button>
      </CardActions>
    </Card>
  );
};

export default AlbumCard;
