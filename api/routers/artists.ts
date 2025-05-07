import express from "express";
import {imagesUpload} from "../middleware/multer";
import Artist from "../model/Artist";
import {Error} from "mongoose";
import authentication, {RequestWithUser} from "../middleware/authentication";

const artistRouter = express.Router();

artistRouter.get("/", async (req, res, next) => {
    try {
        const artists = await Artist.find({isPublished: true}).select("-user");
        res.send(artists);
    } catch (err) {
        next(err);
    }
});

artistRouter.get("/user", authentication, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const artists = await Artist.find({isPublished: false, user: user._id});
        res.send(artists);
    } catch (err) {
        next(err);
    }
});

artistRouter.post("/", authentication, imagesUpload.single("photo"), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const {name, info} = req.body;

        const newArtist = new Artist({
            user: user._id,
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