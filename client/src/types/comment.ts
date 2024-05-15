import type { Product } from "./product";
import type { Reply } from "./reply";
import type { User } from "./user";

export type Comment = {
	_id: string;
	text: string;
	user: User;
	product: Product;
	replies: Reply[];
};
