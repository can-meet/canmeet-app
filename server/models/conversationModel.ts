import mongoose from "mongoose";
import type { Message } from "./messageModel";
import type { User } from "./userModel";

export type Conversation = {
	_id: string;
	participants: User[];
	messages: Message[];
};

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	{ timestamps: true },
);

const Conversation = mongoose.model<Conversation>(
	"Conversation",
	conversationSchema,
);

export default Conversation;
