import mongoose, {Schema, Types} from "mongoose";
import Artist from "./Artist";
import User from "./User";

const albumSchema = new mongoose.Schema({
    user: {
        ref: "User",
        required: true,
        type: Schema.Types.ObjectId,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findOne(value)
                return !!user
            },
            message: "User not found"
        },
    },
    artist: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Artist",
        validate: {
            validator: async (value: Types.ObjectId) => {
                const artist = await Artist.findOne(value)
                return !!artist
            },
            message: "Artist not found"
        },
    },
    title: {
        type: String,
        required: true,
    },
    album_year: {
        type: Number,
        required: true,
    },
    cover: {
        type: String,
        default: null,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Album = mongoose.model("Album", albumSchema);
export default Album;