import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  selectAdminAlbumChangeLoading,
  selectAdminAlbumDeleteLoading,
  selectAdminAlbumFetchLoading,
  selectAdminAlbums,
} from "./albumsAdminSlice.ts";
import {
  albumChangeOfStatus,
  albumDelete,
  fetchAdminAlbums,
} from "./albumsAdminThunks.ts";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IAlbumAdmin } from "../../../types";
import { Grid, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { BASE_URL } from '../../../constants.ts';
import ImageTooltip from '../../../components/UI/ImageTooltip/ImageTooltip.tsx';

const AlbumAdminList = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAdminAlbums);
  const changeLoading = useAppSelector(selectAdminAlbumChangeLoading);
  const fetchLoading = useAppSelector(selectAdminAlbumFetchLoading);
  const deleteLoading = useAppSelector(selectAdminAlbumDeleteLoading);

  useEffect(() => {
    dispatch(fetchAdminAlbums());
  }, [dispatch]);

  const deleteAlbum = async (id: string) => {
    const warning = confirm("Are you sure you want to delete this album?");
    if (warning) {
      await dispatch(albumDelete(id));
      await dispatch(fetchAdminAlbums());
    }
  };

  const changeStatusAlbum = async (id: string) => {
    await dispatch(albumChangeOfStatus(id));
    await dispatch(fetchAdminAlbums());
  };

  const columns: GridColDef<IAlbumAdmin>[] = [
    {
      field: "artist",
      headerName: "Artist",
      width: 150,
      valueGetter: (_value, row) => row.artist?.name,
    },
    { field: "album_year", headerName: "Year", width: 100 },
    {
      field: "User Publishing",
      headerName: "User",
      width: 150,
      valueGetter: (_value, row) => row.user?.username,
    },
    { field: "title", headerName: "Title", width: 150 },
    {
      field: 'cover',
      headerName: 'Cover',
      width: 70,
      renderCell: (field) => {
        if (!field.row.cover) {
          return null;
        }

        const photoUrl = BASE_URL + '/' + field.row.cover;
        return (
          <ImageTooltip photoUrl={photoUrl} altText={field.row.title}/>
        );
      },
    },
    { field: "isPublished", headerName: "Publication status", width: 130 },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 100,
      renderCell: (fields) => (
        <>
          <IconButton
            onClick={() => deleteAlbum(fields.row._id)}
            disabled={changeLoading}
          >
            <ClearIcon />
          </IconButton>
          <IconButton
            onClick={() => changeStatusAlbum(fields.row._id)}
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
          rows={albums}
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

export default AlbumAdminList;
