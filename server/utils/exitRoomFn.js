import { User } from "../models/user.model.js";
import { Room } from "../models/room.model.js";

async function exitRoomFn(userEmail, roomId) {
    const user = await User.findOne({"email": userEmail}).exec();
    let room = await Room.findById(roomId).exec();
    let m = [];
    if(user && room) {
        let members = room.members;
        try {
            for(let i=0; i<members.length; i++) {
                if(JSON.stringify(members[i]) != JSON.stringify(user._id)) {
                    m.push(members[i]);
                }
            }
        }
        catch(err) {
            console.log(err);
        }
        try {
            await Room.findByIdAndUpdate(roomId, {"members": m});
            await User.findOneAndUpdate({"email": userEmail}, {"joinedRoom": null});
            room = await Room.findById(roomId).exec();
            if(room.members.length == 0) {
                await Room.findByIdAndDelete(roomId);
            }
            return Promise.resolve({
                "status": "success"
            })
        }
        catch(err) {
            return Promise.reject({
                "status": "failed"
            })
        }
    }
    return Promise.reject({
        "status": "failed"
    })
}

export default exitRoomFn;