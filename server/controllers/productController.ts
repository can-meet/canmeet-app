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

    const user = await User.findById(userId)
    if(!user) {
      return res.status(404).json({ message: 'User not found' }) 
    }
  
    const maxLength = 500;
    if (description.length > maxLength) {
      return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
    }
  
    const newProduct = new Product({
      user: userId,
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

    user.postedProducts.push(newProduct)
    await user.save()

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