import React from "react";
import { IAlbumApi } from "../../../types";
import NoImage from "../../../assets/no_Image.jpg";
import { BASE_URL } from "../../../constants.ts";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";

interface Props {
  album: IAlbumApi;
}

const AlbumItem: React.FC<Props> = ({ album }) => {
  let imagePath = NoImage;

  if (album.cover) {
    imagePath = BASE_URL + "/" + album.cover;
  }

  return (
    <Card sx={{ display: "flex", height: 150 }}>
      <CardMedia
        component="img"
        sx={{ width: 150, height: 150, objectFit: "cover" }}
        image={imagePath}
        title={album.title}
      />

      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {album.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {album.album_year}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography sx={{ color: "#a05f5f" }}>Not published</Typography>
        </CardActions>
      </Box>
    </Card>
  );
};

export default AlbumItem;
