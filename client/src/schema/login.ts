import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'メールアドレスを入力してください。',
    })
    .email({
      message:
        '入力に誤りがあります。有効なメールアドレスを再入力してください。',
    }),
  password: z
    .string({
      invalid_type_error: 'パスワードを入力してください。',
    })
    .min(8, {
      message:
        '文字数が不足しています。8文字以上でパスワードを作成してください。',
    }),
})

export type LoginSchema = z.infer<typeof loginSchema>
export const loginResolver = zodResolver(loginSchema)
