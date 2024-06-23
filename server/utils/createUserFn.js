import { User } from "../models/user.model.js";

async function createUserFn(profileImage, email, username) {
    try {
        await User.create({
            profileImage: profileImage,
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