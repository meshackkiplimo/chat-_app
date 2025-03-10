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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const Message_1 = require("../models/Message");
class ChatController {
    // Join a public room and send message history
    static joinRoom(socket_1, _a) {
        return __awaiter(this, arguments, void 0, function* (socket, { room }) {
            socket.join(room);
            console.log(`${socket.id} joined room: ${room}`);
            const messages = yield Message_1.Message.find({ room })
                .sort({ timestamp: -1 })
                .limit(50);
            socket.emit('roomMessages', messages.reverse());
        });
    }
    // Handle sending messages (public or private)
    static sendMessage(io, socket, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = new Message_1.Message(payload);
            yield message.save();
            if (payload.room) {
                // Public room message
                io.to(payload.room).emit('message', payload);
            }
            else if (payload.to) {
                // Private message
                socket.emit('message', payload); // Echo to sender
                io.to(payload.to).emit('message', payload); // Send to recipient
            }
        });
    }
}
exports.ChatController = ChatController;
