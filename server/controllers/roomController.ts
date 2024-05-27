import type { Request, Response } from "express";
import Room from "../models/roomModel";
import Product from "../models/productModel";


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
    await newRoom.save();

    res.status(201).json(newRoom);

	} catch (error) {
		console.log("Error");
		res.status(500).json({ error: "Internal server error" });
	}
};


export const getRooms = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const saleRooms = await Room.find({ seller: userId })
      .populate('product')
      .populate('buyer', 'username profilePicture')
      .populate('seller', 'username profilePicture')
      // .populate('messages');

    const purchaseRooms = await Room.find({ buyer: userId })
      .populate('product')
      .populate('buyer', 'username profilePicture')
      .populate('seller', 'username profilePicture')
      // .populate('messages');

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
        populate: { path: 'sender', select: 'username profilePicture' }
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

