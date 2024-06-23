import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    messages : {
        type: [{
            "sender": Object,
            "message": String
        }],
        default: []
    }
});

export const Room = mongoose.model("Room", roomSchema);