import mongoose from "mongoose";
import "dotenv/config"
import { app } from "../app.js";
import "dotenv/config"
import { httpServer } from "../index.js";

const connectDB = async() => {
    try {
        const mongoInstance = await mongoose.connect(process.env.MONGO_DB_URI);
        app.on("error", (err) => {
            console.log(err);
            process.exit(1);
        })
        httpServer.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
        Promise.resolve();
    }
    catch(err) {
        console.log(err);
        Promise.reject();
    }
}

export default connectDB;