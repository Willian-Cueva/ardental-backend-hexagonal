"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controler_1 = require("./user-controler");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post("/login", user_controler_1.userController.login);
userRouter.post("/register", user_controler_1.userController.register);
