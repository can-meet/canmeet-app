import type { Comment } from "./comment";
import type { User } from "./user";

export type Product = {
	_id: string;
	product_name: string;
	price: number;
	image: string;
	product_status: string;
	description: string;
	payment_method: string;
	location: string;
	sale_status: string;
	user: User;
	comments: Comment[];
};
