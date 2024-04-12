import { Product } from "./product";
import { Reply } from "./reply";
import { User } from "./user";

export type Comment = {
  _id: string;
  text: string;
  user: User;
  product: Product;
  replies: Reply[];
}