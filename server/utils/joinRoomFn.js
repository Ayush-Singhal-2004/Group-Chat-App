import { User } from "../models/user.model.js";
import { Room } from "../models/room.model.js";

async function joinRoomFn(userEmail, roomId) {
    const user = await User.findOne({ "email": userEmail }).exec();
    const room = await Room.findById(roomId).exec();
    if(room) {
        const members = room.members;
        members.push(user);
        try {
            await Room.findByIdAndUpdate(roomId, {"members": members});
            await User.findOneAndUpdate({"email": userEmail}, {"joinedRoom": room._id});
            return Promise.resolve({
                "status": "success",
                "message": "Successfully joined the room",
            })
        }
        catch(err) {
            return Promise.reject({
                "status": "failed",
                "message": "Error joining room"
            })
        }
    }
    return Promise.reject({
        "status": "failed",
        "message": "Room not found"
    })
}

export default joinRoomFn;