import mongoose, { Schema, Types } from "mongoose";
import User from "./User";
import Track from "./Track";

const trackHistorySchema = new mongoose.Schema({
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
  track: {
    ref: "Track",
    required: true,
    type: Schema.Types.ObjectId,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const track = await Track.findOne(value);
        return !!track;
      },
      message: "Track not found",
    },
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const TrackHistory = mongoose.model("TrackHistory", trackHistorySchema);
export default TrackHistory;
