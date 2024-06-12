import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    members: {
        //TODO
    }
}, { timestamps: true });

export const Room = mongoose.model("Room", roomSchema);