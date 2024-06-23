import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    "profileImage": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "username": {
        type: String,
        required: true
    },
    "socketId": {
        type: String
    },
    "joinedRoom": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        default: null
    }
});

export const User = mongoose.model("User", userSchema);