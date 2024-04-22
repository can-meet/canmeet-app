import { Request, Response } from "express";
import Product from "../models/productModel";
import User from "../models/userModel";
import { v2 as cloudinary } from "cloudinary";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      product_name,
      price,
      product_status,
      description,
      payment_method,
      location,
      sale_status
    } = req.body;
    let { images } = req.body;

    const userExists = await User.findById(userId)
    if(!userExists) {
      return res.status(404).json({ message: 'User not found' }) 
    }

    if(images) {
      const imagesToUpload = images.map(async (image: string) => {
        const result = (await cloudinary.uploader.upload(image)).secure_url;
        return result;
      })
      images = await Promise.all(imagesToUpload);
    }
  
    const newProduct = new Product({
      user: userId,
      product_name,
      price,
      images,
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