import mongoose from "mongoose";
import "dotenv/config"
import { app } from "../app.js";

const connectDB = async() => {
    try {
        const mongoInstance = await mongoose.connect(process.env.MONGO_DB_URI);
        app.on("error", (err) => {
            console.log(err);
            process.exit(1);
        })
        Promise.resolve();
    }
    catch(err) {
        console.log(err);
        Promise.reject();
    }
}

export default connectDB;