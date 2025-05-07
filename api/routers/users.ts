import express from "express";
import {Error} from "mongoose";
import User from "../model/User";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
    try {
        const existingUser = await User.findOne({username: req.body.username});

        if (existingUser) {
            res.status(400).send({error: `The user '${req.body.username}' already exists`});
            return;
        }

        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateToken();
        await user.save();
        res.send(user);
    } catch (error) {
        if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

userRouter.post("/sessions", async (req, res, next) => {
   try {
       const user = await User.findOne({username: req.body.username});

       if (!user) {
           res.status(400).send({error: "Invalid password or username"});
           return;
       }

       const isMatch = await user.checkPassword(req.body.password);

       if (!isMatch) {
           res.status(400).send({error: "Invalid password or username"});
           return;
       }

       user.generateToken();
       await user.save();
       res.send({message: "Username and password correct", user});
   } catch (error) {
       next(error);
   }
});

userRouter.delete("/sessions", async (req, res, next) => {
    try {
        const token = req.get("Authorization")?.replace("Bearer ", "");
        if(!token) {
            res.send({message: "Token not found"});
            return;
        }

        const user = await User.findOne({token});
        if (!user) {
            res.send({message: "User not found"});
            return;
        }

        user.generateToken();
        await user.save();
        res.send({message: "Successful logout"});
    }catch (err) {
        next(err);
    }
});

export default userRouter;