import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import {
  createMessage,
  updateMessageReadStatus,
} from '../controllers/messageController'

dotenv.config()

const app: express.Express = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5173'
        : 'https://canmeet.app',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', socket => {
  console.log('a user connected')

  socket.on('joinRoom', async (roomId, userId) => {
    socket.join(roomId)
    console.log(`User ${userId} joined room ${roomId}`)

    // メッセージを既読にする
    await updateMessageReadStatus(userId)
  })

  // 新しいメッセージを送信し、保存する
  socket.on('createMessage', async ({ roomId, senderId, text }) => {
    const savedMessage = await createMessage(roomId, senderId, text)
    io.to(roomId).emit('addNewMessage', savedMessage)
    io.emit('latestMessage')
  })

  socket.on('leaveRoom', async roomId => {
    socket.leave(roomId)
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
})

export { app, io, server }
