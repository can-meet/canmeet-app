import mongoose from "mongoose";
import { UserType } from "./userModel";
import { ProductType } from "./productModel";

export type NotificationType = {
	_id: string;
  receiver: UserType;
	sender: UserType;
  type: string;
  content: string;
	isRead: boolean; 
  product: ProductType;
};

const notificationSchema = new mongoose.Schema(
  {
    receiver: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sender: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: { 
      type: String, 
      enum: ["purchase", "message", "comment"],
      required: true
    },
    content: {
      type: String, 
      required: true
    },
    isRead: {
      type: Boolean, 
      default: false 
    }, 
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    message: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Message'
    },
    comment: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Comment' 
    },
    createdAt: { 
      type: Date, 
      default: Date.now
    },
  },
  { timestamps: true },
);

const Notification = mongoose.model<NotificationType>("Notification", notificationSchema);

export default Notification;