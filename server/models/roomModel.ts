import mongoose from 'mongoose'
import type { Message } from './messageModel'
import type { User } from './userModel'
import { Product } from './productModel'

export type Room = {
  _id: string
  product: Product
  buyer: User
  seller: User
  messages: Message[]
}

const roomSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: [],
      },
    ],
  },
  { timestamps: true },
)

const Room = mongoose.model<Room>('Room', roomSchema)

export default Room
