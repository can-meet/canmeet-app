import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const userSchema = z.object({
  username : z
    .string()
    .min(1, { message: '名前を入力してください。' })
});

export type UserSchema = z.infer<typeof userSchema>;
export const userResolver = zodResolver(userSchema);
