import express from "express";
import "dotenv/config";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

import { app } from "./app.js";
import connectDB from "./db/index.js";

import home from "./routes/home.js"
import createUser from "./routes/user/createUser.js"
import createRoom from "./routes/room/createRoom.js"

const PORT = process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer);

//Connecting to database
// connectDB()
// .then((res) => console.log("DB connected"))
// .catch((err) => console.log("ERROR = " + err))

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/", home);
app.use("/user", createUser);
app.use("/room", createRoom);

//socket.io
io.on("connection", (socket) => {
    console.log(socket.id + "has connected");
})

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})