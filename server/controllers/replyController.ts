import type { Request, Response } from 'express'
import Comment from '../models/commentModel'
import Reply from '../models/replyModel'
import User from '../models/userModel'

export const createReply = async (req: Request, res: Response) => {
  try {
    const { text, userId, commentId } = req.body
    const [user, comment] = await Promise.all([
      User.findById(userId),
      Comment.findById(commentId),
    ])
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    if (!comment) {
      return res.status(404).json({ error: 'comment not found' })
    }

    const reply = new Reply({
      text,
      user: user._id,
      comment: comment._id,
    })
    await reply.save()

    comment.replies.push(reply)
    await comment.save()

    res.status(201).json(reply)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getReplies = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params

    const comment = await Comment.findById(commentId).populate({
      path: 'replies',
      populate: [
        {
          path: 'user',
          select: 'username profilePicture',
          model: 'User',
        },
      ],
    })

    if (!comment) {
      return res.status(404).json({ error: `Comment not found ${commentId}` })
    }

    res.status(200).json(comment.replies)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
