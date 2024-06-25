import type { Product } from './product'
import type { User } from './user'

export type Notification = {
  _id: string
  receiver: User // 通知を受け取るユーザー
  sender: User // 通知を送るユーザー
  type: string // 通知の種類（purchase, message, comment)
  content: string // 通知の内容
  isRead: boolean // 未読か既読か
  product: Product // 関連する商品
}
