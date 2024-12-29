import mongoose from "mongoose";

const Schema = mongoose.Schema;

const promptSchema = new Schema({
    prompt: {
        type: String,
        required: true,
    },
    images: {
        type: [String], // Array of image URLs generated from the prompt
        default: [],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: "User",
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Prompt", promptSchema);
