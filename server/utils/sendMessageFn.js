import { User } from "../models/user.model.js";
import { Room } from "../models/room.model.js";

async function sendMessageFn(roomId, message) {
    const user = await User.findOne({"email": message.email}).exec();
    const room = await Room.findById(roomId).exec();
    if(room) {
        const messages = room.messages;
        messages.push({
            "sender": user,
            "message": message.text
        });
        await Room.findOneAndUpdate({"_id": roomId}, {"messages": messages});
        return Promise.resolve({
            "status": "success",
        });
    } 
    return Promise.reject({
        "status": "failed"
    });
}

export default sendMessageFn;