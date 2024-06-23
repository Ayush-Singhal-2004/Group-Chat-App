import { User } from "../models/user.model.js";
import { Room } from "../models/room.model.js";

async function createRoomFn(userEmail, roomName) {
    const user = await User.findOne({ "email": userEmail }).exec();
    try {
        const room = await Room.create({
            "name": roomName,
            "members": [user]
        });
        await User.findOneAndUpdate({"email": userEmail}, {"joinedRoom": room._id})

        return Promise.resolve({
            "status": "success",
            "message": "Room created successfully",
            "room": room
        })
    }
    catch(err) {
        return Promise.reject({
            "status": "error",
            "message": "Error creating room"
        })
    }
}

export default createRoomFn;