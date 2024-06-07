import type { Request, Response } from "express";
import Room from "../models/roomModel";
import Product from "../models/productModel";
import Message from "../models/messageModel";
import { createMessage } from "./messageController";


export const createRoom = async (req: Request, res: Response) => {
	try {
		const { productId, buyerId, sellerId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const existingRoom = await Room.findOne({ product: productId });
    if (existingRoom) {
      return res.status(400).json({ error: 'Chat room already exists for this product' });
    }

    const newRoom = new Room({
      product: productId,
      buyer: buyerId,
      seller: sellerId,
    });

    // 商品の投稿者が最初のメッセージを送信
    await createMessage(newRoom._id, sellerId, "商品購入申請して頂きありがとうございます！")

    await newRoom.save();

    res.status(201).json(newRoom);

	} catch (error) {
		console.log("Error");
		res.status(500).json({ error: "Internal server error" });
	}
};


export const getUserRooms = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const saleRooms = await Room.find({ seller: userId })
      .populate('product', 'images')
      .populate('buyer', 'username profilePicture')
      .populate('seller', 'username profilePicture')
      .populate({
        path: 'messages',
        options: {
          sort: { createdAt: -1 },
          limit: 5
        }
      });

    const purchaseRooms = await Room.find({ buyer: userId })
      .populate('product', 'images')
      .populate('buyer', 'username profilePicture')
      .populate('seller', 'username profilePicture')
      .populate({
        path: 'messages',
        options: {
          sort: { createdAt: -1 },
          limit: 5
        }
      });

    res.status(200).json({ saleRooms, purchaseRooms });
  } catch (err) {
    console.log('Error fetching rooms:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId)
      .populate('product', 'title product_name price images')
      .populate('buyer', 'username profilePicture')
      .populate('seller', 'username profilePicture')
      .populate({
        path: 'messages',
        populate: [
          { path: 'sender', select: 'username profilePicture' }
        ]
      });

    if(!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json(room);

  } catch (error) {
		console.log("Error");
		res.status(500).json({ error: "Internal server error" });
	}
}

export const getUsersInRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId).populate('buyer seller');
    if (!room) {
      throw new Error('Room not found');
    }

    const users = [room.buyer, room.seller];
    
    res.status(200).json(users);

  } catch (error) {
		console.log("Error");
		res.status(500).json({ error: "Internal server error" });
	}
}

