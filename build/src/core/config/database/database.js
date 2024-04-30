"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const URI = process.env.MONGO_URI || "mongodb://localhost:27017/ardental";
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return mongoose_1.default
        .connect(URI, {
        dbName: process.env.MONGO_BD_NAME || "test",
    })
        .then(() => console.log("MongoDB Connected"))
        .catch((error) => {
        console.error("MongoDB Connection Failed");
        console.log(error);
    });
});
exports.connectDB = connectDB;
(0, exports.connectDB)();
