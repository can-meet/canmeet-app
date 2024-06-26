import mongoose from "mongoose";
import { ProductType } from "./productModel";
import { ReplyType } from "./replyModel";
import { UserType } from "./userModel";

export type CommentType = {
	_id: string;
	text: string;
	user: UserType;
	product: ProductType;
	replies: ReplyType[];
};

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
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

const Comment = mongoose.model<CommentType>("Comment", commentSchema);

export default Comment
