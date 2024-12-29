import mongoose from "mongoose";


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensures usernames are unique
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Ensures a secure password
    },
    token: {
        type: String,
        default: null, // Optional default
    },
    prompts: [{
        type: mongoose.Schema.Types.ObjectId, // Array of references to the Prompt model
        ref: "Prompt",
    }],
});

// Add Passport-Local Mongoose plugin

const User = mongoose.model("User", userSchema);

export  default User;
