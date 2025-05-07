import express from "express";
import artistRouter from "./routers/artists";
import albumRouter from "./routers/albums";
import trackRouter from "./routers/tracks";
import * as mongoose from "mongoose";
import userRouter from "./routers/users";
import trackHistoryRouter from "./routers/trackHistory";
import config from "./config";
import cors from "cors";
import adminRouter from "./routers/admin";

const app = express();
const port = 7000;

app.use(cors());
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/artists", artistRouter);
app.use("/albums", albumRouter);
app.use("/tracks", trackRouter);
app.use("/users", userRouter);
app.use("/track_history", trackHistoryRouter);
app.use(express.static("public"));

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on("exit", () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);