import express from "express";
import { Error } from "mongoose";
import User from "../model/User";
import { OAuth2Client } from "google-auth-library";
import config from "../config";
import { imagesUpload } from "../middleware/multer";

const userRouter = express.Router();
const client = new OAuth2Client(config.google.clientID);

userRouter.post("/google", async (req, res, next) => {
  try {
    if (!req.body.credential) {
      res.status(400).send({ error: "Google login error" });
      return;
    }

    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(400).send({ error: "Google login error" });
      return;
    }

    const username = payload["email"];
    const displayName = payload["name"];
    const googleID = payload["sub"];
    const avatar = payload["picture"];

    let user = await User.findOne({ googleID });
    let passwordGeneration = crypto.randomUUID();

    if (!user) {
      user = new User({
        username,
        password: passwordGeneration,
        displayName,
        googleID,
        avatar,
      });
    }

    user.generateToken();
    await user.save();

    res.send({ message: "Login with Google successfully", user });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", imagesUpload.single("avatar"), async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      res
        .status(400)
        .send({ error: `The user '${req.body.username}' already exists` });
      return;
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? "avatars/" + req.file.filename : null,
    });

    user.generateToken();
    await user.save();
    res.send(user);
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

userRouter.post("/sessions", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(400).send({ error: "Invalid password or username" });
      return;
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      res.status(400).send({ error: "Invalid password or username" });
      return;
    }

    user.generateToken();
    await user.save();
    res.send({ message: "Username and password correct", user });
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/sessions", async (req, res, next) => {
  try {
    const token = req.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.send({ message: "Token not found" });
      return;
    }

    const user = await User.findOne({ token });
    if (!user) {
      res.send({ message: "User not found" });
      return;
    }

    user.generateToken();
    await user.save();
    res.send({ message: "Successful logout" });
  } catch (err) {
    next(err);
  }
});

export default userRouter;
