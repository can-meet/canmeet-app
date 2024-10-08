import type { Request, Response } from 'express'
import Comment from '../models/commentModel'
import Product from '../models/productModel'
import User from '../models/userModel'

export const createComment = async (req: Request, res: Response) => {
  try {
    const { text, userId, productId } = req.body
    const user = await User.findById(userId)
    const product = await Product.findById(productId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    const comment = new Comment({
      text,
      user: user._id,
      product: product._id,
    })

    await comment.save()

    product.comments.push(comment)
    await product.save()

    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params

    const comment = await Comment.findById(commentId).populate({
      path: 'product',
      select: 'user',
      populate: {
        path: 'user',
      },
    })

    return comment
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getComments = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    const product = await Product.findById(productId).populate({
      path: 'comments',
      populate: [
        {
          path: 'user',
          select: 'username profilePicture',
          model: 'User',
        },
      ],
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.status(200).json(product.comments)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
