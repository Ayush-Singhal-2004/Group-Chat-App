import express from 'express';
import createRoomFn from '../../utils/createRoomFn.js';

const router = express.Router();

router.post("/create", (req, res) => {
    const { roomName } = req.body;
    //TODO
});

export default router;