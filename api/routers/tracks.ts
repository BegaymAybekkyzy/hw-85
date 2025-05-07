import express from "express";
import Album from "../model/Album";
import Track from "../model/Track";
import {Error} from "mongoose";
import authentication, {RequestWithUser} from "../middleware/authentication";

const trackRouter = express.Router();

export interface TrackFilter {
    isPublished?: boolean;
    artist?: string;
    album?: string | { $in: string[] };
}

trackRouter.get("/", async (req, res, next) => {
    try {
        const album = req.query.album as string | undefined;
        const artist = req.query.artist as string | undefined;
        let filter: TrackFilter = {};

        if(album) {
            filter = {album};

        } else if(artist) {
            const albums = await Album.find({artist});
            const albumsIds = albums.map(album => album.id);
            filter = {album: {$in: albumsIds}};
        }

        filter.isPublished = true;
        const tracks = await Track.find(filter).sort({ number: 1 });
        res.send(tracks);
    } catch (error) {
        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

trackRouter.get("/user", authentication, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const filter = {user: user._id, isPublished: false};

        const tracks = await Track.find(filter).sort({ number: 1 });
        res.send(tracks);
    } catch (error) {
        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

trackRouter.post("/", authentication, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const {album, title, duration} = req.body;
        const trackCount = await Track.countDocuments({ album });

        const newTrack = new Track({
            user: user._id,
            album,
            title,
            duration,
            number: trackCount + 1,
        });

        await newTrack.save();
        res.send(newTrack);
    } catch (error) {
        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

export default trackRouter;