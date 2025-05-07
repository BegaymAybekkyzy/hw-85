import mongoose, {Schema, Types} from "mongoose";
import User from "./User";

const ArtistSchema = new mongoose.Schema({
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
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: null,
    },
    info: {
        type: String,
        default: null,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;