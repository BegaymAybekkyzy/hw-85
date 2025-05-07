import express from "express";
import {Error} from "mongoose";
import Album from "../../model/Album";
import Track from "../../model/Track";

const adminAlbumRouter = express.Router();

adminAlbumRouter.get("/", async (_req, res, next) => {
    try {
        const albums = await Album.find();
        res.send(albums);
    } catch (err) {
        next(err);
    }
});

adminAlbumRouter.patch("/:id/togglePublished", async (req, res, next) => {
    try {
        const {id} = req.params;
        const album = await Album.findById(id);

        if (!album) {
            res.status(404).send({error: "Not Found album"});
            return;
        }

        const updateAlbum = await Album.findByIdAndUpdate(id, {isPublished: !album.isPublished}, {new: true});
        res.send(updateAlbum);
    } catch (err) {
        if (err instanceof Error.ValidationError || err instanceof Error.CastError) {
            res.status(400).send(err);
            return;
        }
        next(err);
    }
});

adminAlbumRouter.delete("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;

        await Track.deleteMany({ album: id })
        await Album.deleteOne({ _id: id });
        res.send({message: "Album and tracks deleted successfully."});
    } catch (err) {
        if (err instanceof Error.ValidationError || err instanceof Error.CastError) {
            res.status(400).send(err);
            return;
        }
        next(err);
    }
});

export default adminAlbumRouter;