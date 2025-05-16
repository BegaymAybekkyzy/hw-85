import express from "express";
import { imagesUpload } from "../middleware/multer";
import Artist from "../model/Artist";
import { Error } from "mongoose";
import authentication, { RequestWithUser } from "../middleware/authentication";
import Album from "../model/Album";

const artistRouter = express.Router();

artistRouter.get("/", async (req, res, next) => {
  try {
    const artists = await Artist.find({ isPublished: true }).select("-user");
    res.send(artists);
  } catch (err) {
    next(err);
  }
});

artistRouter.get("/user", authentication, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const artists = await Artist.find({ isPublished: false, user: user._id });
    res.send(artists);
  } catch (err) {
    next(err);
  }
});

artistRouter.post(
  "/",
  authentication,
  imagesUpload.single("photo"),
  async (req, res, next) => {
    try {
      const user = (req as RequestWithUser).user;
      const { name, info } = req.body;

      const newArtist = new Artist({
        user: user._id,
        name,
        info,
        photo: req.file ? "photos/" + req.file.filename : null,
      });

      await newArtist.save();
      res.send(newArtist);
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

artistRouter.delete("/:id", authentication, async (req, res, next) => {
  try {
    const { id } = req.params;
    const albums = await Album.find({ artist: id });

    if (albums.length > 0) {
      res
        .status(400)
        .send({
          error:
            "Cannot delete an artist who has albums associated with him or her",
        });
      return;
    }

    const user = (req as RequestWithUser).user;
    const deleteArtist = await Artist.deleteOne({
      _id: id,
      isPublished: false,
      user: user._id,
    });

    if (deleteArtist.deletedCount === 0) {
      res
        .status(400)
        .send({
          error:
            "Unable to delete an artist that has already been published or you didn't create it",
        });
      return;
    }

    res.send({ message: "Artist deleted successfully." });
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

export default artistRouter;
