"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./core/config/load-env-vars");
require("./core/config/database/database");
const server_1 = require("./server");
new server_1.Server().start().catch(handleError);
function handleError(error) {
    console.error(error);
    process.exit(1);
}
process.on("uncaughtException", handleError);
