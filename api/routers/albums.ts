import express from "express";
import { imagesUpload } from "../middleware/multer";
import Album from "../model/Album";
import { Error } from "mongoose";
import authentication, { RequestWithUser } from "../middleware/authentication";
import Track from "../model/Track";

const albumRouter = express.Router();

albumRouter.get("/", async (req, res, next) => {
  try {
    const { artist } = req.query;
    const filter = artist
      ? { artist, isPublished: true }
      : { isPublished: true };
    const albums = await Album.find(filter)
      .sort({ album_year: -1 })
      .select("-user");
    res.send(albums);
  } catch (error) {
    if (
      error instanceof Error.ValidationError ||
      error instanceof Error.CastError
    ) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

albumRouter.get("/user", authentication, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const albums = await Album.find({
      user: user._id,
      isPublished: false,
    }).sort({ album_year: -1 });
    res.send(albums);
  } catch (error) {
    if (
      error instanceof Error.ValidationError ||
      error instanceof Error.CastError
    ) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

albumRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id)
      .populate("artist")
      .sort({ album_year: -1 })
      .select("-user");

    if (!album) {
      res.send({ message: "Album not found" });
      return;
    }
    res.send(album);
  } catch (error) {
    if (
      error instanceof Error.ValidationError ||
      error instanceof Error.CastError
    ) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

albumRouter.post(
  "/",
  authentication,
  imagesUpload.single("cover"),
  async (req, res, next) => {
    try {
      const user = (req as RequestWithUser).user;
      const { artist, album_year, title } = req.body;

      const newAlbum = new Album({
        user: user._id,
        artist,
        album_year,
        title,
        cover: req.file ? "covers/" + req.file.filename : null,
      });

      await newAlbum.save();
      res.send(newAlbum);
    } catch (error) {
      if (
        error instanceof Error.ValidationError ||
        error instanceof Error.CastError
      ) {
        res.status(400).send(error);
        return;
      }
      next(error);
    }
  },
);

albumRouter.delete("/:id", authentication, async (req, res, next) => {
  try {
    const { id } = req.params;
    const tracks = await Track.find({ album: id });

    if (tracks.length > 0) {
      res
        .status(400)
        .send({ error: "Cannot delete an album that has related tracks" });
      return;
    }

    const user = (req as RequestWithUser).user;
    const deleteAlbum = await Album.deleteOne({
      _id: id,
      isPublished: false,
      user: user._id,
    });

    if (deleteAlbum.deletedCount === 0) {
      res
        .status(400)
        .send({
          error:
            "Unable to delete an album that has already been published or you didn't create it",
        });
      return;
    }

    res.send({ message: "Album deleted successfully." });
  } catch (err) {
    if (
      err instanceof Error.ValidationError ||
      err instanceof Error.CastError
    ) {
      res.status(400).send(err);
      return;
    }
    next(err);
  }
});

export default albumRouter;
