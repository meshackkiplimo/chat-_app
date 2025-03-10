import express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db';
import routes from './routes';
import { setupSocket } from './socket/chatSocket';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }, // Adjust for production
});

const PORT = process.env.PORT || 5000;

// Middleware and Routes
app.use(express.json());
app.use('/', routes);

// Database and Socket Setup
connectDB().then(() => {
  setupSocket(io);
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});