import { Request, Response } from "express";
import Product from "../models/productModel";
import User from "../models/userModel";
import Comment from "../models/commentModel";
import Notification from "../models/notificationModel";
import Reply from "../models/replyModel";
import Room from "../models/roomModel";
import Message from "../models/messageModel";

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

    if (!userId || !images || !product_name || !price || !product_status || !description || !payment_method || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' }) 
    }

    const imageUrls = Array.isArray(images) ? images : [];

    const newProduct = new Product({
      user: user._id,
      product_name,
      price,
      images: imageUrls,
      product_status,
      description,
      payment_method,
      location,
      sale_status: "売り出し中",
      comments: []
    })
  
    await newProduct.save()

    if (user) {
      user.postedProducts.push(newProduct)
      await user.save()
    }

    res.status(201).json(newProduct)
  } catch (error) {
    console.error("Error in product controller")
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
    const products = await Product.find({}).sort({ createdAt: -1 }).populate({
      path: 'user',
      select: '_id, username profilePicture'
    });

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

export const updateProductStatus = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { userId, sale_status } = req.body;

    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const product = await Product.findById(productId);
    if(!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.updateOne({ sale_status });
    res.status(200).json(product.sale_status);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);

    if (product) {
      const { user } = product;

      if (user) {
        await User.findByIdAndUpdate(user, {
          $pull: { postedProducts: productId }
        });
      }

      // Remove product from purchaseProducts of the user who bought it
      if (user) {
        await User.findByIdAndUpdate(user, {
          $pull: { purchaseProducts: productId }
        });
      }

      // Delete comments related to the product
      const comments = await Comment.find({ product: productId });
      const commentIds = comments.map(comment => comment._id);

      // Delete replies related to each comment
      await Reply.deleteMany({ comment: { $in: commentIds } });
      await Comment.deleteMany({ product: productId });

      // Delete notifications related to the product
      await Notification.deleteMany({ product: productId });

      // Find and delete rooms related to the product
      const rooms = await Room.find({ product: productId });
      const roomIds = rooms.map(room => room._id);

      // Delete messages in those rooms
      await Message.deleteMany({ room: { $in: roomIds } });
      await Room.deleteMany({ product: productId });

      res.status(204).send('Product and related data deleted');

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