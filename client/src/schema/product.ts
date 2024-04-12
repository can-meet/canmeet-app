import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const productSchema = z.object({
  image: z
    .custom<FileList>()
    .refine((file) => file.length !== 0, { message: '商品写真を選択してください' })
    .transform((file) => file[0])
    .refine((file) => file.size < 500000, { message: 'ファイルサイズは最大5MBです' })
    .refine((file) => IMAGE_TYPES.includes(file.type), {
      message: '.jpgもしくは.pngのみ可能です',
    }),
  product_name: z
    .string({
      required_error: "商品名を入力してください",
    }),
  price: z
    .number({
      required_error: "商品の価格を入力してください",
      invalid_type_error: '数字を入力してください。',
    }),
  description: z
    .string({
      invalid_type_error: '商品説明を入力してください。',
    }),
  product_status: z
    .string({
      required_error: "商品の状態を選択してください",
    }),
  location: z
    .string(),
  payment_method: z
    .string(),
})

export type ProductSchema = z.infer<typeof productSchema>;
export const productResolver = zodResolver(productSchema);