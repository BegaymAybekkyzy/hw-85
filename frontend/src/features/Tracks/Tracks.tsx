import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useParams} from "react-router-dom";
import {fetchTracksByAlbum} from "./tracksThunks.ts";
import {fetchAlbumsById} from "../Albums/albumsThunks.ts";
import {selectFetchLoadingTrack, selectTracks} from "./tracksSlice.ts";
import {selectAlbumInfo} from "../Albums/albumsSlice.ts";
import Typography from "@mui/material/Typography";
import Loader from "../../components/UI/Loader/Loader.tsx";
import TrackCard from "./components/TrackCard.tsx";

const Tracks = () => {
    const dispatch = useAppDispatch();
    const {albumId} = useParams();
    const tracks = useAppSelector(selectTracks);
    const album = useAppSelector(selectAlbumInfo);
    const loading = useAppSelector(selectFetchLoadingTrack);

    useEffect(() => {
        if (albumId) {
            dispatch(fetchTracksByAlbum(albumId));
            dispatch(fetchAlbumsById(albumId));
        }
    }, [dispatch, albumId]);

    let content: React.ReactNode = <h1>No track list</h1>;
    if (loading) {
        content = (
            <Typography component="div" sx={{height: "80hv", display: "flex", justifyContent: "center"}}>
                <Loader/>
            </Typography>)
    }

    if (tracks.length > 0 && !loading) {
        content = (
            tracks.map((track) => (
                <TrackCard key={track._id} track={track}/>
            ))
        );
    }

    let artistName = "Unknown";
    if (album) {
        if (typeof album.artist !== "string") {
            artistName = album.artist.name;
        }
    }

    return (
        <main>
            <h1 style={{color: "#008B8B"}}>{artistName}</h1>
            <hr/>
            <p style={{fontSize: "20px"}}><b>Album:</b>{album ? album.title : "No title"}</p>
            {content}
        </main>
    );
};

export default Tracks;