import mongoose, { Schema, Types } from "mongoose";
import Album from "./Album";
import User from "./User";

const trackSchema = new mongoose.Schema({
  user: {
    ref: "User",
    required: true,
    type: Schema.Types.ObjectId,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findOne(value);
        return !!user;
      },
      message: "User not found",
    },
  },
  title: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Album",
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findOne(value);
        return !!album;
      },
      message: "Album not found",
    },
  },
  duration: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Track = mongoose.model("Track", trackSchema);
export default Track;
