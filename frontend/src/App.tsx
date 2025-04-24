import {Route, Routes} from "react-router-dom";
import ArtistsList from "./features/Artists/ArtistsList.tsx";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Container} from "@mui/material";


const App = () => {
  return (
    <>
        <header>
            <AppToolbar/>
        </header>
        <Container>
            <Routes>
                <Route path="/" element={<ArtistsList/>} />
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
        </Container>
    </>
  )
};

export default App
