import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectAllArtists, selectFetchLoadingArtist} from "./artistsSlice.ts";
import {fetchAllArtists} from "./artistsThunks.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import Typography from "@mui/material/Typography";
import ArtistCard from "./copmonents/ArtistCard.tsx";
import {Grid} from "@mui/material";

const ArtistsList = () => {
        const dispatch = useAppDispatch();
        const allArtists = useAppSelector(selectAllArtists);
        const loading = useAppSelector(selectFetchLoadingArtist);

        useEffect(() => {
            dispatch(fetchAllArtists());
        }, [dispatch]);

        let content: React.ReactNode = <h1>Artist list is empty</h1>;
        if (loading) {
            content = (
                <Typography component="div" sx={{height: "80hv", display: "flex", justifyContent: "center"}}>
                    <Loader/>
                </Typography>)
        }

        if (allArtists.length > 0 && !loading) {
            content = (
                <Grid container spacing={2}>
                    {allArtists.map((artist) => (
                        <Grid key={artist._id}>
                            <ArtistCard artist={artist}/>
                        </Grid>
                    ))}
                </Grid>
            )
        }

        return (
            <main>
                {content}
            </main>
        );
    }
;

export default ArtistsList;