import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Loader from "../../components/UI/Loader/Loader.tsx";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectDeleteLoadingArtist,
  selectFetchLoadingArtist,
  selectUnpublishedArtists,
} from './artistsSlice.ts';
import { deleteArtist, fetchUnpublishedArtists } from './artistsThunks.ts';
import ArtistItem from "./copmonents/ArtistItem.tsx";

const UnpublishedArtists = () => {
  const dispatch = useAppDispatch();
  const unpublishedArtists = useAppSelector(selectUnpublishedArtists);
  const loading = useAppSelector(selectFetchLoadingArtist);
  const deleteLoading = useAppSelector(selectDeleteLoadingArtist);

  useEffect(() => {
    dispatch(fetchUnpublishedArtists());
  }, [dispatch]);


  const onDeleteArtist = async (id: string) => {
    const warning = confirm("Are you sure you want to delete this artist?");
    if (warning) {
      await dispatch(deleteArtist(id));
      await dispatch(fetchUnpublishedArtists());
    }
  }

  let content: React.ReactNode = (
    <Typography variant={"h5"}>You don't have any unpublished users</Typography>
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

  if (unpublishedArtists.length > 0 && !loading) {
    content = (
      <Grid container spacing={2}>
        {unpublishedArtists.map((artist) => (
          <Grid key={artist._id}>
            <ArtistItem
              artist={artist}
              onDeleteArtist={onDeleteArtist}
              loading={deleteLoading}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <div style={{ maxHeight: "33vh", overflowX: "auto", paddingBottom: 10 }}>
      {content}
    </div>
  );
};

export default UnpublishedArtists;
