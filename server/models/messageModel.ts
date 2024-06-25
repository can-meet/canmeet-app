import mongoose from 'mongoose'
import type { User } from './userModel'
import type { Room } from './roomModel'

export type Message = {
  _id: string
  sender: User
  text: string
  isRead: boolean
  room: Room
}

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

const Message = mongoose.model<Message>('Message', messageSchema)

export default Message
