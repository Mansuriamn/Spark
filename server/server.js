import express from 'express';
import connectDB from './config/dataBase.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import courseRoutes from './routes/courseRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import userRoutes from './routes/userRoutes.js';
import meetingRouter from "./routes/meetingRouter.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));  // allow nested objects in request body
app.use(bodyParser.json())

// ✅ Socket.IO Events
io.on('connection', socket => {
  console.log('🔌 Socket connected:', socket.id);

  socket.on('join-room', roomId => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined');
  });

  socket.on('offer', data => {
    socket.to(data.roomId).emit('offer', data.offer);
  });

  socket.on('answer', data => {
    socket.to(data.roomId).emit('answer', data.answer);
  });

  socket.on('ice-candidate', data => {
    socket.to(data.roomId).emit('ice-candidate', data.candidate);
  });
});
server.listen(5000, () => {
  console.log('✅ Server running at http://localhost:5000');
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/uploads', express.static('uploads'));  // serve uploaded images
app.use('/api/users', userRoutes);  // serve user routes
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/meetings', meetingRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})