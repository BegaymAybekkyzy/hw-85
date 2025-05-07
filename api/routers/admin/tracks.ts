import express from "express";
import {Error} from "mongoose";
import Track from "../../model/Track";

const adminTrackRouter = express.Router();

adminTrackRouter.get("/", async (_req, res, next) => {
    try {
        const tracks = await Track.find();
        res.send(tracks);
    } catch (err) {
        next(err);
    }
});

adminTrackRouter.patch("/:id/togglePublished", async (req, res, next) => {
    try {
        const {id} = req.params;
        const track = await Track.findById(id);

        if (!track) {
            res.status(404).send({error: "Not Found album"});
            return;
        }

        const updateAlbum = await Track.findByIdAndUpdate(id, {isPublished: !track.isPublished}, {new: true});
        res.send(updateAlbum);
    } catch (err) {
        if (err instanceof Error.ValidationError || err instanceof Error.CastError) {
            res.status(400).send(err);
            return;
        }
        next(err);
    }
});

adminTrackRouter.delete("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;

        await Track.deleteOne({ _id: id });
        res.send({message: "Track deleted successfully."});
    } catch (err) {
        if (err instanceof Error.ValidationError || err instanceof Error.CastError) {
            res.status(400).send(err);
            return;
        }
        next(err);
    }
});
export default adminTrackRouter;