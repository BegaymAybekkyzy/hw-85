import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectDeleteLoadingTrack,
  selectFetchLoadingTrack,
  selectUnpublishedTrack,
} from './tracksSlice.ts';
import { deleteTrack, fetchUnpublishedTracks } from './tracksThunks.ts';
import Typography from "@mui/material/Typography";
import Loader from "../../components/UI/Loader/Loader.tsx";
import TrackItem from "./components/TrackItem.tsx";
import { Grid } from "@mui/material";

const UnpublishedTracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectUnpublishedTrack);
  const loading = useAppSelector(selectFetchLoadingTrack);
  const deleteLoading = useAppSelector(selectDeleteLoadingTrack);

  useEffect(() => {
    dispatch(fetchUnpublishedTracks());
  }, [dispatch]);

  const onDeleteTrack = async (id: string) => {
    const warning = confirm("Are you sure you want to delete this track?");
    if (warning) {
      await dispatch(deleteTrack(id));
      await  dispatch(fetchUnpublishedTracks());
    }
  }

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
            <TrackItem
              onDeleteTrack={onDeleteTrack}
              loading={deleteLoading}
              track={track} />
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
