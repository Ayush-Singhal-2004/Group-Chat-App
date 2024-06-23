import express from "express";
import createRoomFn from "../../utils/createRoomFn.js";
import joinRoomFn from "../../utils/joinRoomFn.js";
import { Room } from "../../models/room.model.js";
import exitRoomFn from "../../utils/exitRoomFn.js";

const router = express.Router();

router.post("/create", async(req, res) => {
    const { userEmail, roomName } = req.body;
    const result = await createRoomFn(userEmail, roomName);
    res.json(result);
});

router.post("/join", async(req, res) => {
    const { userEmail, roomId } = req.body;
    const result = await joinRoomFn(userEmail, roomId);
    res.json(result);
});

router.get("/:roomId/chats", async(req, res) => {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId).exec();
    if(room) {
        res.json(room.messages);
    }
});

router.post("/exit", async(req, res) => {
    const { userEmail, roomId } = req.body;
    const result = await exitRoomFn(userEmail, roomId);
    res.json(result);
})

export default router;