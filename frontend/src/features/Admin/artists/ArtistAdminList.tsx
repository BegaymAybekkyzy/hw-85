import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import {
  selectAdminArtistChangeLoading,
  selectAdminArtistDeleteLoading,
  selectAdminArtistFetchLoading,
  selectAdminArtists,
} from './artistsAdminSLice.ts';
import {
  artistChangeOfStatus,
  artistDelete,
  fetchAdminArtists,
} from './artistsAdminThunks.ts';
import { useEffect } from 'react';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { IArtistAdmin } from '../../../types';
import { Grid, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { BASE_URL } from '../../../constants.ts';
import ImageTooltip from '../../../components/UI/ImageTooltip/ImageTooltip.tsx';

const ArtistAdminList = () => {
  const dispatch = useAppDispatch();
  const changeLoading = useAppSelector(selectAdminArtistChangeLoading);
  const deleteLoading = useAppSelector(selectAdminArtistDeleteLoading);
  const fetchLoading = useAppSelector(selectAdminArtistFetchLoading);
  const artists = useAppSelector(selectAdminArtists);

  useEffect(() => {
    dispatch(fetchAdminArtists());
  }, [dispatch]);

  const deleteArtist = async (id: string) => {
    const warning = confirm('Are you sure you want to delete this artist?');
    if (warning) {
      await dispatch(artistDelete(id));
      await dispatch(fetchAdminArtists());
    }
  };

  const changeStatusArtist = async (id: string) => {
    await dispatch(artistChangeOfStatus(id));
    await dispatch(fetchAdminArtists());
  };

  const columns: GridColDef<IArtistAdmin>[] = [
    {
      field: 'user',
      headerName: 'User Publishing',
      width: 150,
      valueGetter: (_value, row) => row.user?.username,
    },
    {field: 'name', headerName: 'Name', width: 150},
    {field: 'info', headerName: 'Info', width: 200},
    {field: 'isPublished', headerName: 'Publication status', width: 150},
    {
      field: 'photo',
      headerName: 'Photo',
      width: 70,
      renderCell: (field) => {
        if (!field.row.photo) {
          return null;
        }

        const photoUrl = BASE_URL + '/' + field.row.photo;
        return (
          <ImageTooltip photoUrl={photoUrl} altText={field.row.name}/>
        );
      },
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: (fields) => (
        <>
          <IconButton
            onClick={() => deleteArtist(fields.row._id)}
            disabled={changeLoading}
          >
            <ClearIcon/>
          </IconButton>
          <IconButton
            onClick={() => changeStatusArtist(fields.row._id)}
            disabled={deleteLoading}
          >
            <EditIcon/>
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
          rows={artists}
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

export default ArtistAdminList;
