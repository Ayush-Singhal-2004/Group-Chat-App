import express from "express";
import createUserFn from "../../utils/createUserFn.js";
import { User } from "../../models/user.model.js";

const router = express.Router();

router.post("/create", (req, res) => {
    const { profileImage, email, username } = req.body;
    createUserFn(profileImage, email, username)
    .then((response) => {
        res.json(response);
    })
    .catch((err) => {
        res.status(500).json({message: "Error creating user", error: err.message});
    })
});

router.get("/:email", async(req, res) => {
    const email = req.params.email;
    const result = await User.findOne({ "email": email }).exec();
    if(result) {
        res.json(result);
    }
})

router.post("/details", async(req, res) => {
    const users = req.body.users;
    const usersPromise = users.map(async(user) => {
        return await User.findById(user).exec();
    })
    const result = await Promise.all(usersPromise);
    res.json(result);
})

export default router;