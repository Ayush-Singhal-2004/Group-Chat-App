import { v4 } from "uuid"
import { Room } from "../models/roomSchema.js";

async function createRoomFn(roomName) {
    const roomId = v4();
    try {
        const newRoom = new Room({
            //TODO
        });
        Promise.resolve({
            "status": "success",
            "message": "Room created successfully"
        })
    }
    catch(err) {
        Promise.reject({
            "status": "error",
            "message": "Error creating room"
        });
    }
}

export default createRoomFn;