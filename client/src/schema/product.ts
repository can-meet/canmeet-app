import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

// const IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
// const IMAGE_SIZE_LIMIT = 100_000;

// const imageFileListSchema = z.object({
//   images: z
//     .custom<FileList>()
//     .refine((file) => file.length > 0, { message: '商品写真を選択してください' })
//     .refine(
//       (files) =>
//         Array.from(files).every((file) => file.size < IMAGE_SIZE_LIMIT),
//       { message: "添付できる画像ファイルは5MBまでです" },
//     )
//     .refine(
//       (files) =>
//         Array.from(files).every((file) => IMAGE_TYPES.includes(file.type)),
//       { message: "添付できる画像ファイルはjpegかpngです" },
//     ),
// })

// const imageUrlArraySchema = z.array(z.string().url());

export const productSchema = z.object({
  userId: z.string(),
  images: z
    .any()
    .refine((files) => files.length > 0, {
      message: '商品写真を選択してください',
    })
    .refine((files: any) => files && files.length > 0 && files.length <= 5, {
      message: "商品写真は最大5つまで選択できます",
    }),
    // .array(z.string()),
  product_name: z
    .string({
      required_error: "商品名を入力してください",
    }),
  price: z
    .string()
    .min(1, {
      message: '価格を入力してください。',
    })
    .max(5, {
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
      required_error: "商品の状態を選択してください",
    })
    .min(1, {
      message: '商品説明を入力してください。',
    }),
  location: z
    .string()
    .min(1, {
      message: '商品説明を入力してください。',
    }),
  payment_method: z
    .string()
    .min(1, {
      message: '商品説明を入力してください。',
    }),
})

export type ProductSchema = z.infer<typeof productSchema>;
export const productResolver = zodResolver(productSchema);