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

    user.postedProducts.push(newProduct)
    await user.save()

    res.status(201).json(newProduct)
  } catch (error) {
    console.log("Error in product controller")
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.productId).populate({
      path: 'user',
      select: '_id, username profilePicture'
    });

		if (!product) {
			return res.status(404).json({ error: "product not found" });
		}

		res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const {
      userId,
      images,
      product_name,
      price,
      product_status,
      description,
      payment_method,
      location
    } = req.body;
    const formattedPrice = parseInt(price);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.updateOne({
      userId,
      images,
      product_name,
      price: formattedPrice,
      product_status,
      description,
      payment_method,
      location
    })

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const isDeleted = await Product.findByIdAndDelete(productId);
    if (isDeleted) {
      res.status(204).send('Product deleted');
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const purchaseProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;
    const product = await Product.findByIdAndUpdate(productId, {
      sale_status: '取引中'
    }, { new: true });

    if (product) {
      const user = await User.findByIdAndUpdate(userId, {
        $push: { purchasedProducts: productId }
      }, { new: true });
    
      res.json(product);

    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}