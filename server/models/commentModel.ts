import mongoose, { Schema, Types } from 'mongoose';
import { Reply } from './replyModel';
import { User } from './userModel';
import { Product } from './productModel';

export type Comment = {
  _id: string;
  text: string;
  user: User;
  product: Product;
  replies: Reply[];
}

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    replies: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Reply'
    }],
    createdAt: { 
      type: Date, 
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model<Comment>('Comment', commentSchema);

export default Comment;