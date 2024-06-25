import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

export const replySchema = z.object({
  userId: z.string(),
  commentId: z.string(),
  text: z
    .string()
    .max(200, { message: 'コメントは100文字以内で記載してください。' }),
})

export type ReplySchema = z.infer<typeof replySchema>
export const replyResolver = zodResolver(replySchema)
