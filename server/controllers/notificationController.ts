import { Request, Response } from 'express'
import Notification from '../models/notificationModel'
import Product from '../models/productModel'
import User from '../models/userModel'
import Comment from '../models/commentModel'
import Message from '../models/messageModel'
import { sendPurchaseNotification } from '../mail'

// 通知を全て表示させる
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({
      receiver: req.params.userId,
    })
      .populate('sender', 'username profilePicture')
      .populate('product', 'images')
      .sort('-createdAt')
    res.status(200).json(notifications)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server Error' })
  }
}

// 未読の通知を表示させる
export const getUnreadNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({
      receiver: req.params.userId,
      isRead: false,
    })
    res.status(200).json(notifications)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server Error' })
  }
}

// 通知を未読から既読にする
export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findById(req.params.notificationId)
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' })
    }
    notification.isRead = true
    await notification.save()
    res.status(200).json(notification)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server Error' })
  }
}

// 気になった商品に対してコメントを送ったときに相手側に通知を送る
export const sendCommentNotification = async (req: Request, res: Response) => {
  try {
    const { productId, userId } = req.body
    const { commentId } = req.params

    const [product, sender, comment] = await Promise.all([
      Product.findById(productId).populate('user'),
      User.findById(userId),
      Comment.findById(commentId),
    ])

    if (!product || !sender || !comment) {
      return res
        .status(404)
        .json({ error: 'Product, sender or comment not found' })
    }

    if (product.user._id.toString() === sender._id.toString()) {
      return res
        .status(400)
        .json({ error: 'Receiver and sender cannot be the same' })
    }

    const notification = new Notification({
      product: product._id,
      comment: comment._id,
      receiver: product.user._id,
      sender: sender._id,
      type: 'comment',
      content: `${sender.username}さんがあなたの投稿した商品にコメントをしました: ${comment.text}`,
    })

    await notification.save()
    res.status(200).json(notification)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server Error' })
  }
}

// 商品を購入したら商品の投稿者に通知を送る
export const purchaseNotification = async (req: Request, res: Response) => {
  try {
    const { receiverId, senderId } = req.body
    const { productId } = req.params

    const [product, receiver, sender] = await Promise.all([
      Product.findById(productId),
      User.findById(receiverId),
      User.findById(senderId),
    ])

    if (!product || !receiver || !sender) {
      return res
        .status(404)
        .json({ error: 'Product, receiver or seller not found' })
    }

    if (receiver._id.toString() === sender._id.toString()) {
      return res
        .status(400)
        .json({ error: 'Buyer and seller cannot be the same' })
    }

    const notification = new Notification({
      product: product._id,
      receiver: receiver._id,
      sender: sender._id,
      type: 'purchase',
      content: `${sender.username}さんがあなたの投稿した商品の購入手続きを開始しました。早速dmで取引を始めましょう!`,
    })

    await notification.save()

    const sellerEmail = receiver.email
    const productName = product.product_name
    sendPurchaseNotification(sellerEmail, productName)

    res.status(200).json(notification)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server Error' })
  }
}
