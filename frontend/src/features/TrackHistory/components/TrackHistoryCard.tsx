import React from "react";
import { Typography, Box, Grid, Card } from "@mui/material";
import { ITrackHistory } from "../../../types";
import dayjs from "dayjs";

interface Props {
  trackHistory: ITrackHistory;
}

const TrackHistoryCard: React.FC<Props> = ({ trackHistory }) => {
  return (
    <Card sx={{ marginBottom: "20px", border: "1px solid #008B8B" }}>
      <Grid
        container
        alignItems="center"
        justifyContent={"space-between"}
        sx={{ padding: "20px" }}
      >
        <Box>
          <Typography variant="h5">{trackHistory.track.title}</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {trackHistory.track.album.artist.name}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "text.secondary" }}>
            {dayjs(trackHistory.datetime).format("DD.MM.YYYY HH:mm")}
          </Typography>
        </Box>
      </Grid>
    </Card>
  );
};

export default TrackHistoryCard;
