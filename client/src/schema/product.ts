import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const productSchema = z.object({
  userId: z.string(),
  images: z
    .any()
    .refine(files => files.length > 0, {
      message: '商品写真を選択してください',
    })
    .refine(
      (files: FileList) => files && files.length > 0 && files.length <= 5,
      {
        message: '商品写真は最大5つまで選択できます',
      },
    ),
  product_name: z
    .string({
      invalid_type_error: '商品名を入力してください',
    })
    .min(1, {
      message: '商品名を入力してください。',
    }),
  price: z.number().nonnegative().max(5, {
    message: '価格は5桁までです。',
  }),
  description: z
    .string({
      invalid_type_error: '商品説明を入力してください。',
    })
    .min(1, {
      message: '商品説明を入力してください。',
    }),
  product_status: z
    .string({
      invalid_type_error: '商品の状態を選択してください',
    })
    .min(1, {
      message: '商品の状態を選択してください。',
    }),
  location: z.string().min(1, {
    message: '受け渡し場所を選択してください。',
  }),
  payment_method: z.string().min(1, {
    message: '支払い方法を選択してください。',
  }),
})

export type ProductSchema = z.infer<typeof productSchema>
export const productResolver = zodResolver(productSchema)
