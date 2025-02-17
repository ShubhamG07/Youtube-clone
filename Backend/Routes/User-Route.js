import express from "express";
import { signupUser,signinUser,logoutUser } from "../Controller/User-Contoller.js";

const userRouter =express.Router();

userRouter.post("/signup",signupUser);
userRouter.post("/signin", signinUser);
userRouter.post("/logout", logoutUser);

export default userRouter;