"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = void 0;
const chatController_1 = require("../controllers/chatController");
const setupSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        // Join room event
        socket.on('joinRoom', (payload) => {
            chatController_1.ChatController.joinRoom(socket, payload);
        });
        // Send message event
        socket.on('sendMessage', (payload) => {
            chatController_1.ChatController.sendMessage(io, socket, payload);
        });
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
exports.setupSocket = setupSocket;
