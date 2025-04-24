import express from "express";
import User from "../model/User";
import TrackHistory from "../model/TrackHistory";
import {Error} from "mongoose";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", async (req, res, next) => {
    try {
        const token = req.get("Authorization");
        if (!token) {
            res.status(401).send({error: "No token present"});
            return;
        }

        const user = await User.findOne({token});

        if (!user) {
            res.status(401).send({error: "User not found"});
            return;
        }

        const newTrackHistory = new TrackHistory({
            user,
            token,
            track: req.body.track,
            datetime: new Date().toISOString(),
        });

        await newTrackHistory.save();
        res.send(newTrackHistory);
    } catch (error) {
        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

export default trackHistoryRouter;