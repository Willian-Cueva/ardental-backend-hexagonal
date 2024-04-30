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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./core/config/config");
const user_router_1 = require("./users/infraestructure/rest-api/user-router");
// import morgan from "morgan";
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use((_req, res, next) => {
            res.header({
                "Access-Control-Allow-Origin": "*",
                origin: "*",
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                preflightContinue: true,
                optionsSuccessStatus: 204,
            });
            next();
        });
        // this.app.use(morgan("dev"));
        this.app.use(express_1.default.json({ limit: "50mb" }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
        //routes
        const api = "/api";
        this.app.use(`${api}/users`, user_router_1.userRouter);
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "..", "assets")));
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.app.listen(config_1.config.server.port, () => {
                    console.log(`Server running on port ${config_1.config.server.port}`);
                    resolve();
                });
            });
        });
    }
}
exports.Server = Server;
