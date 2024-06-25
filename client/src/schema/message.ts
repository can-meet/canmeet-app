import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

export const messageSchema = z.object({
  text: z.string().min(1, { message: 'メッセージを入力してください。' }),
})

export type MessageSchema = z.infer<typeof messageSchema>
export const messageResolver = zodResolver(messageSchema)
