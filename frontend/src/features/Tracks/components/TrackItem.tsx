import React from "react";
import { ITrackApi } from "../../../types";
import { Card, CardActions, CardContent, Typography } from "@mui/material";

interface Props {
  tracks: ITrackApi;
}

const TrackItem: React.FC<Props> = ({ tracks }) => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h5">
          {tracks.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tracks.duration || "No description provided."}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography sx={{ color: "#a05f5f" }}>Not published</Typography>
      </CardActions>
    </Card>
  );
};

export default TrackItem;
