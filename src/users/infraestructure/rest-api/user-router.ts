import express from "express";

import { userController } from "./user-controler";


const userRouter = express.Router();

userRouter.post("/login",userController.login);
userRouter.post("/register",userController.register);

export { userRouter };