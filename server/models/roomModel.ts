import mongoose from 'mongoose'
import { MessageType } from './messageModel'
import { UserType } from './userModel'
import { ProductType } from './productModel'

export type RoomType = {
  _id: string
  product: ProductType
  buyer: UserType
  seller: UserType
  messages: MessageType[]
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

const Room = mongoose.model<RoomType>('Room', roomSchema)

export default Room
