import { Request, Response } from "express";
import User from "../models/userModel";
import Product from "../models/productModel";


export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('postedProducts').populate('purchasedProducts')
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};