import express from "express";
import createUserFn from "../../utils/createUserFn.js";

const router = express.Router();

router.post("/create", (req, res) => {
    const { email, username } = req.body;
    createUserFn(email, username)
    .then((response) => {
        res.json(response);
    })
    .catch((err) => {
        res.status(500).json({message: "Error creating user", error: err.message});
    })
});

export default router;