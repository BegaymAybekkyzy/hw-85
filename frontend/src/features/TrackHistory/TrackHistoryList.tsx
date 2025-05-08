import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectTrackHistory, selectTrackHistoryLoading} from "./trackHistorySlice.ts";
import Typography from "@mui/material/Typography";
import Loader from "../../components/UI/Loader/Loader.tsx";
import TrackHistoryCard from "./components/TrackHistoryCard.tsx";
import {fetchTrackHistory} from "./trackHistoryThunks.ts";

const TrackHistoryList = () => {
    const trackHistory = useAppSelector(selectTrackHistory);
    const loading = useAppSelector(selectTrackHistoryLoading);
    const dispatch = useAppDispatch();

    let content: React.ReactNode = <Typography variant={"h5"}>The story is still blank</Typography>

    useEffect(() => {
        dispatch(fetchTrackHistory());
    }, [dispatch]);

    if (loading) {
        content = (
            <Typography component="div" sx={{height: "80hv", display: "flex", justifyContent: "center"}}>
                <Loader/>
            </Typography>
        )
    }

    if (trackHistory.length > 0) {
        content = (
            trackHistory.map((history) => (
                <TrackHistoryCard key={history._id} trackHistory={history}/>
            ))
        );
    }

    return (
        <main>
            <Typography
                sx={{color: "#5F9EA0"}}
                variant={"h4"}
                marginBottom={4}
            >Track history</Typography>
            {content}
        </main>
    );
};

export default TrackHistoryList;