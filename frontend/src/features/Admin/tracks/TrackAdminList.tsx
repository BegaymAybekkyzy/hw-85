import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  selectAdminTracks,
  selectAdminTracksChangeLoading,
  selectAdminTracksDeleteLoading,
  selectAdminTracksFetchLoading,
} from "./tracksAdminSlice.ts";
import { useEffect } from "react";
import {
  fetchAdminTracks,
  trackChangeOfStatus,
  trackDelete,
} from "./tracksAdminThunks.ts";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ITrackAdmin } from "../../../types";
import { Grid, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

const TrackAdminList = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectAdminTracks);
  const changeLoading = useAppSelector(selectAdminTracksChangeLoading);
  const deleteLoading = useAppSelector(selectAdminTracksDeleteLoading);
  const fetchLoading = useAppSelector(selectAdminTracksFetchLoading);

  console.log(tracks);
  useEffect(() => {
    dispatch(fetchAdminTracks());
  }, [dispatch]);

  const deleteTrack = async (id: string) => {
    const warning = confirm("Are you sure you want to delete this track?");
    if (warning) {
      await dispatch(trackDelete(id));
      await dispatch(fetchAdminTracks());
    }
  };

  const changeStatusTrack = async (id: string) => {
    await dispatch(trackChangeOfStatus(id));
    await dispatch(fetchAdminTracks());
  };

  const columns: GridColDef<ITrackAdmin>[] = [
    {
      field: "album",
      headerName: "Album",
      width: 150,
      valueGetter: (_value, row) => row.album?.title,
    },

    {
      field: "artistName",
      headerName: "Artist",
      width: 150,
      valueGetter: (_value, row) => row.album?.artist.name,
    },
    { field: "title", headerName: "Title", width: 100 },
    {
      field: "User Publishing",
      headerName: "User",
      width: 100,
      valueGetter: (_value, row) => row.user?.username,
    },
    { field: "duration", headerName: "Duration", width: 90 },
    { field: "isPublished", headerName: "Publication status", width: 150 },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 100,
      renderCell: (fields) => (
        <>
          <IconButton
            onClick={() => deleteTrack(fields.row._id)}
            disabled={changeLoading}
          >
            <ClearIcon />
          </IconButton>
          <IconButton
            onClick={() => changeStatusTrack(fields.row._id)}
            disabled={deleteLoading}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Grid container>
      <Grid>
        <DataGrid
          loading={fetchLoading}
          getRowId={(row) => row._id}
          rows={tracks}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          pageSizeOptions={[100]}
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      </Grid>
    </Grid>
  );
};

export default TrackAdminList;
