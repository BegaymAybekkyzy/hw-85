import express from "express";
import {imagesUpload} from "../middleware/multer";
import Artist from "../model/Artist";
import {Error} from "mongoose";

const artistRouter = express.Router();

artistRouter.get("/", async (_req, res, next) => {
    try {
        const artist = await Artist.find();
        res.send(artist);
    } catch (err) {
        next(err);
    }
});

artistRouter.post("/", imagesUpload.single("photo"), async (req, res, next) => {
    try {
        const {name, info} = req.body;

        const newArtist = new Artist({
            name,
            info,
            photo: req.file ? "photos/" + req.file.filename : null,
        });

        await newArtist.save();
        res.send(newArtist);
    } catch (error) {

        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

export default artistRouter;