import express from "express";
import authentication from "../../middleware/authentication";
import permit from "../../middleware/permit";
import adminArtistRouter from "./artists";
import adminAlbumRouter from "./albums";
import adminTrackRouter from "./tracks";

const adminRouter = express.Router();

adminRouter.use(authentication, permit("admin"));
adminRouter.use("/artists", adminArtistRouter);
adminRouter.use("/albums", adminAlbumRouter);
adminRouter.use("/tracks", adminTrackRouter);

export default adminRouter;