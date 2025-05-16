import express from "express";
import Artist from "../../model/Artist";
import { Error } from "mongoose";
import Album from "../../model/Album";
import Track from "../../model/Track";

const adminArtistRouter = express.Router();

adminArtistRouter.get("/", async (_req, res, next) => {
  try {
    const artists = await Artist.find().populate({
      path: "user",
      select: "username",
    });
    res.send(artists);
  } catch (err) {
    next(err);
  }
});

adminArtistRouter.patch("/:id/togglePublished", async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id);

    if (!artist) {
      res.status(404).send({ error: "Not Found artist" });
      return;
    }

    const updateArtist = await Artist.findByIdAndUpdate(
      id,
      { isPublished: !artist.isPublished },
      { new: true },
    );
    res.send(updateArtist);
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

adminArtistRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const albums = await Album.find({ artist: id });
    const albumIds = albums.map((album) => album._id);

    await Track.deleteMany({ album: { $in: albumIds } });
    await Album.deleteMany({ artist: id });
    await Artist.deleteOne({ _id: id });

    res.send({
      message: "Artist and related albums and tracks deleted successfully.",
    });
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

export default adminArtistRouter;
