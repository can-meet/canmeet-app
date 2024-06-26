import mongoose from "mongoose";
import { UserType } from "./userModel";

export type MessageType = {
	_id: string;
	sender: UserType;
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
			default: false,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true },
);

const Message = mongoose.model<MessageType>("Message", messageSchema);

export default Message;
