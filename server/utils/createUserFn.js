import { User } from "../models/userSchema.js";

async function createUserFn(email, username) {
    try {
        await User.create({
            email: email,
            username: username
        });
        Promise.resolve({
            status: "success",
            message: "User created successfully"
        });
    }
    catch(err) {
        Promise.reject({
            status: "error",
            message: "Error creating user"
        });
    }
}

export default createUserFn;