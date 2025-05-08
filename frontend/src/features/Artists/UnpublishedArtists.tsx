import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Loader from "../../components/UI/Loader/Loader.tsx";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectFetchLoadingArtist,
  selectUnpublishedArtists,
} from "./artistsSlice.ts";
import { fetchUnpublishedArtists } from "./artistsThunks.ts";
import ArtistItem from "./copmonents/ArtistItem.tsx";

const UnpublishedArtists = () => {
  const dispatch = useAppDispatch();
  const unpublishedArtists = useAppSelector(selectUnpublishedArtists);
  const loading = useAppSelector(selectFetchLoadingArtist);

  useEffect(() => {
    dispatch(fetchUnpublishedArtists());
  }, [dispatch]);
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
            <ArtistItem artist={artist} />
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
