import type { ProductType } from './product'
import type { ReplyType } from './reply'
import type { UserType } from './user'

export type CommentType = {
  _id: string
  text: string
  user: UserType
  product: ProductType
  replies: ReplyType[]
  createdAt: string
}
