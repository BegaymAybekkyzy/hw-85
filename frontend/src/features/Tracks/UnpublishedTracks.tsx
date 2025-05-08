import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectFetchLoadingTrack,
  selectUnpublishedTrack,
} from "./tracksSlice.ts";
import { fetchUnpublishedTracks } from "./tracksThunks.ts";
import Typography from "@mui/material/Typography";
import Loader from "../../components/UI/Loader/Loader.tsx";
import TrackItem from "./components/TrackItem.tsx";
import { Grid } from "@mui/material";

const UnpublishedTracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectUnpublishedTrack);
  const loading = useAppSelector(selectFetchLoadingTrack);

  useEffect(() => {
    dispatch(fetchUnpublishedTracks());
  }, [dispatch]);

  let content: React.ReactNode = (
    <Typography variant={"h5"}>No track list</Typography>
  );
  if (loading) {
    content = (
      <Typography
        component="div"
        sx={{ height: "80hv", display: "flex", justifyContent: "center" }}
      >
        <Loader />
      </Typography>
    );
  }

  if (tracks.length > 0 && !loading) {
    content = (
      <Grid container spacing={2}>
        {tracks.map((track) => (
          <Grid size={6} key={track._id}>
            <TrackItem tracks={track} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <div
      style={{
        maxHeight: "30vh",
        overflowX: "auto",
        paddingBottom: 10,
        marginBottom: 70,
      }}
    >
      {content}
    </div>
  );
};

export default UnpublishedTracks;
