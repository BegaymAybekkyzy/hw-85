import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectAllArtists, selectFetchLoading} from "./artistsSlice.ts";
import {fetchAllArtists} from "./artistsThunks.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import Typography from "@mui/material/Typography";
import ArtistCard from "./copmonents/ArtistCard.tsx";
import {Grid} from "@mui/material";

const ArtistsList = () => {
        const dispatch = useAppDispatch();
        const allArtists = useAppSelector(selectAllArtists);
        const loading = useAppSelector(selectFetchLoading);

        useEffect(() => {
            dispatch(fetchAllArtists());
        }, [dispatch]);

        let content: React.ReactNode = <h1>Artist list is empty</h1>;
        if (loading) {
            content = (
                <Typography component="div" style={{height: "80hv", display: "flex", justifyContent: "center"}}>
                    <Loader/>
                </Typography>)
        }

        if (allArtists.length > 0 && !loading) {
            content = (
                allArtists.map((artist) => (
                    <Grid>
                        <ArtistCard key={artist._id} artist={artist}/>
                    </Grid>
                ))
            )
        }

        return (
            <main>
                <Grid container spacing={2}>
                    {content}
                </Grid>
            </main>
        );
    }
;

export default ArtistsList;