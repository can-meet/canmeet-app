import { Message } from "./message";;
import { Product } from "./product";
import { User } from "./user";

export type Room = {
	_id: string;
	product: Product;
	buyer: User;
  seller: User;
	messages: Message[];
};