import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchAlbumsByArtist} from "./albumsThunks.ts";
import {selectAlbumsByArtist, selectArtistName, selectFetchLoadingAlbum} from "./albumsSlice.ts";
import Typography from "@mui/material/Typography";
import Loader from "../../components/UI/Loader/Loader.tsx";
import {Grid} from "@mui/material";
import AlbumCard from "./components/AlbumCard.tsx";

const Albums = () => {
    const {artistId} = useParams();
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbumsByArtist);
    const loading = useAppSelector(selectFetchLoadingAlbum);
    const artistName = useAppSelector(selectArtistName);

    useEffect(() => {
        if (artistId) {
            dispatch(fetchAlbumsByArtist(artistId))
        }
    }, [artistId]);

    let content: React.ReactNode = <h2>No albums</h2>;
    if (loading) {
        content = (
            <Typography component="div" sx={{height: "80hv", display: "flex", justifyContent: "center"}}>
                <Loader/>
            </Typography>)
    }

    if (albums.length > 0 && !loading) {
        content = (
           <Grid container spacing={2}>
               { albums.map((album) => (
                   <Grid key={album._id}>
                       <AlbumCard album={album}/>
                   </Grid>
               ))}
           </Grid>
        )
    }

    return (
        <main>
            <h1 style={{color: "#008B8B"}}>{artistName}</h1>
            {content}
        </main>
    );
};

export default Albums;