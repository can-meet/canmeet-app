import mongoose from 'mongoose'
import { CommentType } from './commentModel'
import { UserType } from './userModel'

export type ReplyType = {
  _id: string
  text: string
  createdAt: string
  user: UserType
  comment: CommentType
}

const replySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

const Reply = mongoose.model<ReplyType>('Reply', replySchema)

export default Reply
