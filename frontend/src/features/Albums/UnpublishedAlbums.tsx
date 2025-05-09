import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectAlbumDeleteLoading,
  selectAlbumUnpublished,
  selectFetchLoadingAlbum,
} from './albumsSlice.ts';
import { deleteAlbum, fetchUnpublishedAlbums } from './albumsThunks.ts';
import Typography from "@mui/material/Typography";
import Loader from "../../components/UI/Loader/Loader.tsx";
import { Grid } from "@mui/material";
import AlbumItem from "./components/AlbumItem.tsx";

const UnpublishedAlbums = () => {
  const dispatch = useAppDispatch();
  const unpublishedAlbums = useAppSelector(selectAlbumUnpublished);
  const loading = useAppSelector(selectFetchLoadingAlbum);
  const deleteLoading = useAppSelector(selectAlbumDeleteLoading);

  useEffect(() => {
    dispatch(fetchUnpublishedAlbums());
  }, [dispatch]);

  const onDeleteAlbum = async (id: string) => {
    const warning = confirm("Are you sure you want to delete this album?");
    if (warning) {
      await dispatch(deleteAlbum(id));
      await  dispatch(fetchUnpublishedAlbums());
    }
  }

  let content: React.ReactNode = (
    <Typography variant={"h5"}>
      Your list of unpublished albums is empty
    </Typography>
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

  if (unpublishedAlbums.length > 0 && !loading) {
    content = (
      <Grid container spacing={2}>
        {unpublishedAlbums.map((album) => (
          <Grid key={album._id}>
            <AlbumItem
              album={album}
              onDeleteAlbum={onDeleteAlbum}
              loading={deleteLoading}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <div style={{ maxHeight: "34vh", overflowX: "auto", paddingBottom: 10 }}>
      {content}
    </div>
  );
};
export default UnpublishedAlbums;
