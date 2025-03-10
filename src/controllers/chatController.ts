import { Socket } from 'socket.io';
import { Message } from '../models/Message';
import { MessagePayload, RoomPayload } from '../types';

export class ChatController {
  // Join a public room and send message history
  static async joinRoom(socket: Socket, { room }: RoomPayload) {
    socket.join(room);
    console.log(`${socket.id} joined room: ${room}`);

    const messages = await Message.find({ room })
      .sort({ timestamp: -1 })
      .limit(50);
    socket.emit('roomMessages', messages.reverse());
  }

  // Handle sending messages (public or private)
  static async sendMessage(io: any, socket: Socket, payload: MessagePayload) {
    const message = new Message(payload);
    await message.save();

    if (payload.room) {
      // Public room message
      io.to(payload.room).emit('message', payload);
    } else if (payload.to) {
      // Private message
      socket.emit('message', payload); // Echo to sender
      io.to(payload.to).emit('message', payload); // Send to recipient
    }
  }
}