import type { Request, Response } from "express";
import User from "../models/userModel";
import Message from "../models/messageModel";
import Room from "../models/roomModel";


export const createMessage = async (roomId: string, senderId: string, text: string) => {
  try {
    const sender = await User.findById(senderId);
    if (!sender) {
      console.log('Sender not found')
      return;
    }

    const newMessage = new Message({ sender, text });
    const savedMessage = await newMessage.save();

    const room = await Room.findById(roomId);
      if (room) {
        room.messages.push(savedMessage);
        await room.save();
      }

    return savedMessage;
  } catch (error) {
    console.error(`Internal Server Error ${error}`)
  }
}


export const updateMessageReadStatus = async (userId: string) => {
  try {
    // 現在のユーザーIDと異なる送信者IDを持つメッセージを更新
    await Message.updateMany(
      { sender: { $ne: userId }, isRead: false },
      { $set: { isRead: true } }
    );
  } catch (err) {
    console.error(err);
  }
}


export const getRoomMessages = async (roomId: string) => {
  const room = await Room.findById(roomId)
    .populate({
      path: 'messages',
      populate: [
        { path: 'sender', select: 'username profilePicture' }
      ]
    });
  return room?.messages;
}