import express from "express";
import { signupUser,signinUser,logoutUser,userProfile,updateProfile } from "../Controller/User-Contoller.js";

const userRouter =express.Router();

// middleware function to check if someone is already logged in 
const checkLoggedIn = (req, res, next) => {
    if (req.cookies.token) {
        return res.status(403).json({ error: "A user is already logged in. Logout first!" });
    }
    next();
};

userRouter.post("/signup",checkLoggedIn, signupUser);
userRouter.post("/signin", checkLoggedIn, signinUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/profile", userProfile);
userRouter.put("/profile", updateProfile);


export default userRouter;