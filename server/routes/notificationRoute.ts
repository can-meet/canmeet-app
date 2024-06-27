import express from 'express'
import {
  getNotifications,
  markNotificationAsRead,
  sendCommentNotification,
  purchaseNotification,
  getUnreadNotifications,
} from '../controllers/notificationController'

const router = express.Router()

router.get('/users/:userId', getNotifications) // 通知を全て表示させる
router.get('/unread/:userId', getUnreadNotifications) // 未読の通知を表示させる
router.put('/:notificationId', markNotificationAsRead) // 通知を未読から既読にする
router.post('/comments/:commentId', sendCommentNotification) // 気になった商品に対してコメントを送ったときに相手側に通知を送る
router.post('/purchase/:productId', purchaseNotification) // 商品を購入したら商品の投稿者に通知を送る

export default router
