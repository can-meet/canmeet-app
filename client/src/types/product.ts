import type { Comment } from "./comment";
import type { User } from "./user";

export type Product = {
	_id: string;
	product_name: string;
	price: number;
	images: string[];
	product_status: string;
	description: string;
	payment_method: string;
	location: string;
	sale_status: string;
	user: User;
	comments: Comment[];
};

export type DetailProduct = {
  _id: string;
  product_name: string,
  price: number,
  images: string[],
  product_status: string,
  description: string,
  payment_method: string,
  location: string,
  sale_status: string,
  user: {
    _id: string;
    username: string, 
    profilePicture: string,
  },
  comments: Comment[],
  createdAt: string
}