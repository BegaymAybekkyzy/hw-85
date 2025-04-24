import {Route, Routes} from "react-router-dom";
import ArtistsList from "./features/Artists/ArtistsList.tsx";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Container} from "@mui/material";
import Albums from "./features/Albums/Albums.tsx";
import Tracks from "./features/Tracks/Tracks.tsx";


const App = () => {
  return (
    <>
        <header>
            <AppToolbar/>
        </header>
        <Container>
            <Routes>
                <Route path="/" element={<ArtistsList/>} />
                <Route path="/artist_albums/:artistId" element={<Albums/>} />
                <Route path="/album_tracks/:albumId" element={<Tracks/>} />
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
        </Container>
    </>
  )
};

export default App
