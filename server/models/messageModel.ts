import mongoose from "mongoose";
import type { User } from "./userModel";

export type Message = {
	_id: string;
	sender: User;
	text: string;
	isRead: boolean;
};

const messageSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		isRead: {
			type: Boolean,
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
