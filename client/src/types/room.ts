import type { MessageType } from './message'
import type { ProductType } from './product'
import type { UserType } from './user'

export type RoomType = {
  _id: string
  product: ProductType
  buyer: UserType
  seller: UserType
  messages: MessageType[]
}
