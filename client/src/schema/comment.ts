import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

export const commentSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  text: z
    .string()
    .max(200, { message: 'コメントは100文字以内で記載してください。' }),
})

export type CommentSchema = z.infer<typeof commentSchema>
export const commentResolver = zodResolver(commentSchema)
