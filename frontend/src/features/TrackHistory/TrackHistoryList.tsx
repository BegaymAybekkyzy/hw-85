import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {logout, selectUser} from "../Users/usersSlice.ts";
import {fetchTrackHistory} from "./trackHistoryThunks.ts";
import {selectTrackHistory, selectTrackHistoryError, selectTrackHistoryLoading} from "./trackHistorySlice.ts";
import Typography from "@mui/material/Typography";
import Loader from "../../components/UI/Loader/Loader.tsx";
import TrackHistoryCard from "./components/TrackHistoryCard.tsx";
import {useNavigate} from "react-router-dom";

const TrackHistoryList = () => {
    const user = useAppSelector(selectUser);
    const trackHistory = useAppSelector(selectTrackHistory);
    const loading = useAppSelector(selectTrackHistoryLoading);
    const error = useAppSelector(selectTrackHistoryError);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            if (error) {
                navigate("/authentication");
                dispatch(logout());
            }
            const storage = localStorage.getItem("persist:store: users");
            if (!storage) {
                navigate("/authentication");
                dispatch(logout());
                return;
            }

            const parsed = JSON.parse(storage);
            const userStorage = JSON.parse(parsed.user);

            if (user && userStorage.token !== user.token) {
                navigate("/authentication");
                dispatch(logout());
                return;
            }

            if (user) {
                dispatch(fetchTrackHistory(user.token)).unwrap();
            }
        }catch (error) {
            console.error(error);
            navigate("/authentication");
            dispatch(logout());
        }


    }, [dispatch, navigate, user]);

    let content: React.ReactNode = <Typography variant={"h3"}>The story is still blank</Typography>

    if(loading) {
        content = (
            <Typography component="div" sx={{height: "80hv", display: "flex", justifyContent: "center"}}>
                <Loader/>
            </Typography>
        )
    }

    if (trackHistory.length > 0) {
        content = (
            trackHistory.map((history) => (
                <TrackHistoryCard key={history._id} trackHistory={history} />
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