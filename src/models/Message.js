"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    room: { type: String, required: false },
    to: { type: String, required: false },
    from: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Number, default: Date.now },
});
exports.Message = (0, mongoose_1.model)('Message', MessageSchema);
