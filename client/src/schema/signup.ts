import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const signUpStepOneSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'メールアドレスを入力してください。',
    })
    .email({ message: '入力に誤りがあります。有効なメールアドレスを再入力してください。' }),
   password: z
    .string({
      invalid_type_error: 'パスワードを入力してください。',
    })
    .min(8, { message: '文字数が不足しています。8文字以上でパスワードを作成してください。' }),
})

export const signUpStepTwoSchema = z.object({
  username: z
    .string({
      invalid_type_error: '名前を入力してください。',
    })
    .min(1, { message: '名前を入力してください。' })
    .max(15, { message: '30文字以内で名前を入力してください。' }),
})


export const signUpSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'メールアドレスを入力してください。',
    })
    .email({ message: '入力に誤りがあります。有効なメールアドレスを再入力してください。' }),
   password: z
    .string({
      invalid_type_error: 'パスワードを入力してください。',
    })
    .min(8, { message: '文字数が不足しています。8文字以上でパスワードを作成してください。' }),
  username: z
    .string({
      invalid_type_error: '名前を入力してください。',
    })
    .min(1, { message: '名前を入力してください。' })
    .max(15, { message: '30文字以内で名前を入力してください。' }),
  profilePicture: z.string().nullable()
})

export type SignUpSchema = z.infer<typeof signUpSchema>;
export const signUpResolver = zodResolver(signUpSchema);