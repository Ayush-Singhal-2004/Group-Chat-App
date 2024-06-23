import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

import { app } from "./app.js";
import connectDB from "./db/index.js";

import home from "./routes/home.js"
import userRoutes from "./routes/user/user.js"
import roomRoutes from "./routes/room/room.js"

import { User } from "./models/user.model.js";
import { Room } from "./models/room.model.js";

import sendMessageFn from "./utils/sendMessageFn.js";


export const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: true
});

// Connecting to database
connectDB()
.then((res) => console.log("DB connected"))
.catch((err) => console.log("ERROR = " + err))

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/", home);
app.use("/user", userRoutes);
app.use("/room", roomRoutes);


//socket.io
io.on("connection", (socket) => {
    console.log(socket.id + "has connected");

    socket.on("getUser-details", async(userId) => {
        const user = await User.findById(userId).exec();
        if(user) {
            socket.emit("user-details", user);
        }
    })

    socket.on("join-room", ({roomId}) => {
        socket.join(roomId);
    })

    socket.on("getRoom-details", async({userEmail, roomId}) => {
        const user = await User.findOne({"email": userEmail}).exec();
        const room = await Room.findById(roomId).exec();
        if(room) {
            socket.emit("room-details", room);
        }
    })

    socket.on("send-message", async({message, roomId}) => {
        const result = await sendMessageFn(roomId, message);
        if(result.status == "success") {
            const room = await Room.findById(roomId).exec();
            io.to(roomId).emit("message", room.messages);
        }
    })

    socket.on("disconnect", () => {
        //TODO
    })
})