import express from "express";
import {imagesUpload} from "../multer";
import Album from "../model/Album";
import {Error} from "mongoose";

const albumRouter = express.Router();

albumRouter.get("/", async (req, res, next) => {
    try {
        const {artist} = req.query;
        const filter = artist ? {artist} : {};
        const albums = await Album.find(filter);
        res.send(albums);
    } catch (error) {
        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

albumRouter.get("/:id", async (req, res, next) => {
   try {
       const {id} = req.params;
       const album = await Album.findById(id).populate("artist");

       if (!album) {
           res.send({message: "Album not found"});
           return;
       }
       res.send(album);
   } catch (error) {
       if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
           res.status(400).send(error);
           return;
       }
       next(error);
   }
});

albumRouter.post("/", imagesUpload.single("cover"), async (req, res, next) => {
    try {
        const {artist, album_year, title} = req.body;

        const newAlbum = new Album({
            artist,
            album_year,
            title,
            cover: req.file ? "covers/" + req.file.filename : null,
        });

        await newAlbum.save();
        res.send(newAlbum);
    } catch (error) {
        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

export default albumRouter;