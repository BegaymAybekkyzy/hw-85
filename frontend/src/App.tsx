import { Route, Routes } from "react-router-dom";
import ArtistsList from "./features/Artists/ArtistsList.tsx";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import { Container } from "@mui/material";
import Albums from "./features/Albums/Albums.tsx";
import Tracks from "./features/Tracks/Tracks.tsx";
import Registration from "./features/Users/Registration.tsx";
import Authentication from "./features/Users/Authentication.tsx";
import TrackHistoryList from "./features/TrackHistory/TrackHistoryList.tsx";
import ProtectedRoute from "./components/UI/ProtectedRoute/ProtectedRoute.tsx";
import { useAppSelector } from "./app/hooks.ts";
import { selectUser } from "./features/Users/usersSlice.ts";
import ArtistAdminList from "./features/Admin/artists/ArtistAdminList.tsx";
import AlbumAdminList from "./features/Admin/albums/AlbumAdminList.tsx";
import TrackAdminList from "./features/Admin/tracks/TrackAdminList.tsx";
import Admin from "./features/Admin/Admin.tsx";
import UnpublishedList from './features/Users/UnpublishedList.tsx';
import AddArtist from './features/Artists/AddArtist.tsx';
import AddAlbum from './features/Albums/AddAlbum.tsx';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container>
        <Routes>
          <Route
            path="admin"
            element={
              <ProtectedRoute isAllowed={user && user.role === "admin"}>
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route path="artists" element={<ArtistAdminList />} />
            <Route path="albums" element={<AlbumAdminList />} />
            <Route path="tracks" element={<TrackAdminList />} />
          </Route>

          <Route path="/" element={<ArtistsList />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/artist_albums/:artistId" element={<Albums />} />
          <Route path="/album_tracks/:albumId" element={<Tracks />} />
          <Route
            path="/unpublished-ones"
            element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <UnpublishedList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track-history"
            element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <TrackHistoryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-artist"
            element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <AddArtist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-album"
            element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <AddAlbum />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
