import type { User } from './user'

export type Message = {
  _id: string
  sender: User
  text: string
  isRead: boolean
  createdAt: Date
}
