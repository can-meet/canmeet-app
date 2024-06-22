import mongoose from 'mongoose'
import type { User } from './userModel'
import type { Product } from './productModel'

export type Notification = {
  _id: string
  receiver: User // 通知を受け取るユーザー
  sender: User // 通知を送るユーザー
  type: string // 通知の種類（purchase, message, comment)
  content: string // 通知の内容
  isRead: boolean // 未読か既読か
  product: Product // 関連する商品
}

const notificationSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['purchase', 'message', 'comment'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

const Notification = mongoose.model<Notification>(
  'Notification',
  notificationSchema,
)

export default Notification
