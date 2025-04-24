import mongoose, {Schema, Types} from "mongoose";
import Artist from "./Artist";

const albumSchema = new mongoose.Schema({
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
});

const Album = mongoose.model("Album", albumSchema);
export default Album;