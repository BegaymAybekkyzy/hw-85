import express from "express";
import TrackHistory from "../model/TrackHistory";
import {Error} from "mongoose";
import authentication, {RequestWithUser} from "../middleware/authentication";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", authentication, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const newTrackHistory = new TrackHistory({
            user: user._id,
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

trackHistoryRouter.get("/",authentication, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const trackHistory = await TrackHistory.find({user: user._id}).populate({
            path: "track",
            populate: {
                path: "album",
                model: "Album",
                populate: {
                    path: "artist",
                    model: "Artist"
                }
            }
        }).sort({ datetime: -1 });
        res.send(trackHistory);
    } catch (error) {
        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

export default trackHistoryRouter;