import mongoose from "mongoose";
import type { User } from "./userModel";

export type Message = {
	_id: string;
	senderId: User;
	receiverId: User;
	message: string;
};

const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true },
);

const Message = mongoose.model<Message>("Message", messageSchema);

export default Message;
