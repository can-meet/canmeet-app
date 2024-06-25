import type { Message } from './message'
import type { Product } from './product'
import type { User } from './user'

export type Room = {
  _id: string
  product: Product
  buyer: User
  seller: User
  messages: Message[]
}
