import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import Message from '../models/messageModel';
import Room from '../models/roomModel';


const app: express.Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://canmeet.netlify.app',
    // origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// メッセージを既読にする
const updateReadStatus = async (userId: string) => {
  try {
    // 現在のユーザーIDと異なる送信者IDを持つメッセージを更新
    await Message.updateMany(
      { sender: { $ne: userId }, isRead: false },
      { $set: { isRead: true } }
    );
    console.log('Messages are read for user', userId);
  } catch (err) {
    console.error(err);
  }
}

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('joinRoom', async (roomId, userId) => {
    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);

    updateReadStatus(userId)

    const room = await Room.findById(roomId)
      .populate({
        path: 'messages',
        populate: [
          { path: 'sender', select: 'username profilePicture' }
        ]
      });
      
    if (room) {
      socket.emit('roomMessages', room.messages);
    }
  });

  socket.on('checkRoom', async (roomId) => {
    // 継続してルームに参加しているかチェックし、必要に応じて既読を更新
    updateReadStatus(roomId);
  });

  // チャットルーム一覧画面に表示する最新のメッセージを取得
  socket.on('getLatestMessage', async (roomId) => {
    const room = await Room.findById(roomId)
      .populate({
        path: 'messages',
        options: {
          sort: { 'createdAt': -1 },
          limit: 1
        },
      });

    if (room && room.messages.length > 0) {
      const latestMessage = room.messages[0]
      socket.emit('latestMessage', latestMessage);
    } else {
      socket.emit('latestMessage', null);
    }
  });

  // 新しいメッセージを送信し、保存する
  socket.on('sendMessage', async ({ roomId, sender, text }) => {
    const newMessage = new Message({ sender: sender, text, isRead: false });
    const savedMessage = await newMessage.save();

    const room = await Room.findById(roomId);
    if (room) {
      room.messages.push(newMessage);
      await room.save();
    }

    const populatedMessage = await savedMessage.populate('sender');

    io.to(roomId).emit('addNewMessage', populatedMessage);
    io.to(roomId).emit('latestMessage', populatedMessage);
  });



  socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
	});
});


export { app, io, server }