import React from "react";
import { ITrackApi } from "../../../types";
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

interface Props {
  track: ITrackApi;
  onDeleteTrack: (id: string) => void;
  loading?: boolean;
}

const TrackItem: React.FC<Props> = ({ track, onDeleteTrack, loading=false }) => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h5">
          {track.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {track.duration || "No description provided."}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography sx={{ color: "#a05f5f" }}>Not published</Typography>
        <Button
          sx={{ color: "#a05f5f" }}
          onClick={() =>onDeleteTrack(track._id)}
          disabled={loading}
        >Delete</Button>
      </CardActions>
    </Card>
  );
};

export default TrackItem;
