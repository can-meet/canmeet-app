import { Request, Response } from "express";
import Product from "../models/productModel";
import User from "../models/userModel";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      images,
      product_name,
      price,
      product_status,
      description,
      payment_method,
      location,
    } = req.body;
    const formattedPrice = parseInt(price);

    const user = await User.findById(userId)
    if(!user) {
      return res.status(404).json({ message: 'User not found' }) 
    }

    const imageUrls = Array.isArray(images) ? images : [];

    const newProduct = new Product({
      user: user,
      product_name,
      price: formattedPrice,
      images: imageUrls,
      product_status,
      description,
      payment_method,
      location,
      sale_status: "売り出し中",
      comments: []
    })
  
    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (error) {
    console.log("Error in product controller")
    res.status(500).json({ error: (error as Error).message })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ error: "product not found" });
		}

		res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}


export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

		if (!products) {
			return res.status(404).json({ error: "product not found" });
		}

		res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}