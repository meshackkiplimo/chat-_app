import { Server, Socket } from 'socket.io';
import { ChatController } from '../controllers/chatController';

export const setupSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('A user connected:', socket.id);

    // Join room event
    socket.on('joinRoom', (payload) => {
      ChatController.joinRoom(socket, payload);
    });

    // Send message event
    socket.on('sendMessage', (payload) => {
      ChatController.sendMessage(io, socket, payload);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};