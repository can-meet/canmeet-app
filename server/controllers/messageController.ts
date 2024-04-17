import { Request, Response } from "express";
import Conversation from "../models/conversationModel";
import Message from "../models/messageModel";
// import { getReceiverSocketId, io } from "../socket/socket";

export const sendMessage = async (req: Request, res: Response) => {
	try {
		const { message, userId: senderId } = req.body;
		const { id: receiverId } = req.params;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error");
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req: Request, res: Response) => {
	try {
    const { userId: senderId } = req.body;
		const { id: userToChatId } = req.params;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages");

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error");
		res.status(500).json({ error: "Internal server error" });
	}
};