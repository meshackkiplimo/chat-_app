"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const db_1 = require("./config/db");
const routes_1 = __importDefault(require("./routes"));
const chatSocket_1 = require("./socket/chatSocket");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: { origin: '*' }, // Adjust for production
});
const PORT = process.env.PORT || 3000;
// Middleware and Routes
app.use(express_1.default.json());
app.use('/', routes_1.default);
// Database and Socket Setup
(0, db_1.connectDB)().then(() => {
    (0, chatSocket_1.setupSocket)(io);
    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
