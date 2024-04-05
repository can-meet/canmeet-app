import { Request, Response } from "express";
import Product from "../models/productModel";
import User from "../models/userModel";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      product_name,
      price,
      image,
      product_status,
      description,
      payment_method,
      location,
      sale_status
    } = req.body;

    if(!product_name || !price || !image || !product_status || !description || !payment_method || !location || !sale_status) {
      return res.status(400).json({ message: 'Still some blanks left' })
    }

    const userExists = await User.findById(userId)
    if(!userExists) {
      return res.status(404).json({ message: 'User not found' }) 
    }
  
    // if(user._id.toString() !== req.user._id.toString())
  
    const maxLength = 500;
    if (description.length > maxLength) {
      return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
    }
  
    const newProduct = new Product({
      userId,
      product_name,
      price,
      image,
      product_status,
      description,
      payment_method,
      location,
      sale_status
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