import express from "express";
import Album from "../model/Album";
import Track from "../model/Track";
import {Error} from "mongoose";

const trackRouter = express.Router();

trackRouter.get("/", async (req, res, next) => {
    try {
        const {album, artist} = req.query;
        let filter = {};

        if(album) {
            filter = {album};

        } else if(artist) {
            const albums = await Album.find({artist});
            const albumsIds = albums.map(album => album.id);
            filter = {album: {$in: albumsIds}};
        }

        const tracks = await Track.find(filter);
        res.send(tracks);
    } catch (error) {
        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

trackRouter.post("/", async (req, res, next) => {
    try {
        const {album, title, duration, number} = req.body;

        const newTrack = new Track({
            album,
            title,
            duration,
            number,
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