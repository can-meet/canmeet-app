import type { ProductType } from './product'
import type { UserType } from './user'

export type NotificationType = {
  _id: string
  receiver: UserType
  sender: UserType
  type: string
  content: string
  isRead: boolean
  product: ProductType
}
